function Compile(el, vm) {
    // vm 实例
    this.$vm = vm;
    this.$el = document.querySelector(el);
    this.$fragment = null;
    this.init();
}

Compile.prototype = {
    init: function() {
        if (this.$el) {
            /**
             * 将根节点下的元素转化成 fragment 文档片断
             * fragment 是一个包含节点的元素
             */
            this.$fragment = this.nodeToFragment(this.$el);
            // 编译 fragment
            this.compile(this.$fragment);
            // 将 fragment 放回原来的位置
            this.$el.appendChild(this.$fragment);
        }
    },
    compile: function(el) {
        var childNodes = el.childNodes;
        var self = this;
        // 将节点集合转化成数组，并判断节点类型，调用相应的编译方法
        [].slice.call(childNodes).forEach(function(node) {
            var text = node.textContent;
            // 判断是否是符合这种形式{{}}的指令
            var reg = /\{\{(.*)\}\}/;
            if (self.isElementNode(node)) {
                self.compileElement(node);
            } else if (self.isTextNode(node) && reg.test(text)) {
                // 提取 {{}} 中的变量名
                self.compileText(node, reg.exec(text)[1]);
            }
            // 编译子节点
            if (node.childNodes && node.childNodes.length) {
                self.compile(node);
            }
        });
    },
    // 编译元素节点
    compileElement: function(node) {
        var nodeAttrs = node.attributes;
        var self = this;
        // 遍历元素节点的属性，处理指令
        [].slice.call(nodeAttrs).forEach(function(attr) {
            var attrName = attr.name;
            if (self.isDirective(attrName)) {
                // 指令的值 ""
                var exp = attr.value;
                // 指令类型，如model
                var dir = attrName.substring(2);
                if (self.isEventDirective(dir)) {
                    // 事件指令
                    self.compileEvent(node, exp, dir);
                } else {
                    // 普通指令
                    self.compileModel(node, exp, dir);
                }
            }
            // 移除处理过的指令
            node.removeAttribute(attrName);
        });
    },
    compileText: function(node, exp) {
        var self = this;
        // 从 vm 实例中获取变量的值
        var initText = self.$vm[exp];
        self.textUpdater(node, initText);
        // 监听变量 exp
        new Watcher(self.$vm, exp, function(newText) {
            self.textUpdater(node, newText);
        });
    },
    compileEvent: function(node, exp, dir) {
        var self = this;
        var eventType = dir.split(':')[1];
        // 当 methods 不为空时返回 methods[exp]
        var cb = self.$vm.methods && self.$vm.methods[exp];
        if (eventType && cb) {
            node.addEventListener(eventType, cb.bind(self.$vm), false);
        }
    },
    compileModel: function(node, exp, dir) {
        var self = this;
        var value = self.$vm[exp];
        this.modelUpdater(node, value);
        new Watcher(self.$vm, exp, function(newValue) {
            self.modelUpdater(node, newValue);
        });
        node.addEventListener('input', function(e) {
            var inputValue = e.target.value;
            if (value === inputValue) {
                return;
            }
            self.$vm[exp] = inputValue;
            value = inputValue;
        });
    },
    nodeToFragment: function(el) {
        var fragment = document.createDocumentFragment();
        var child = el.firstChild;
        while (child) {
            // appendChild 会将 child 节点从原位置移除
            fragment.appendChild(child);
            child = el.firstChild;
        }
        return fragment;
    },
    modelUpdater: function(node, value) {
        node.value = typeof value == 'undefined' ? '' : value;
    },
    textUpdater: function(node, text) {
        node.textContent = typeof text == 'undefined' ? '' : text;
    },
    isElementNode: function(node) {
        return node.nodeType == 1;
    },
    isTextNode: function(node) {
        return node.nodeType == 3;
    },
    isDirective: function(attr) {
        return attr.indexOf('v-') == 0;
    },
    isEventDirective: function(dir) {
        return dir.indexOf('on:') == 0;
    }
};
