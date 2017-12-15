"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Lint = require("tslint");
var ts = require("typescript");
var Rule = (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new MaxClassExportWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
var MaxClassExportWalker = (function (_super) {
    __extends(MaxClassExportWalker, _super);
    function MaxClassExportWalker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.exportedClasses = 0;
        return _this;
    }
    MaxClassExportWalker.prototype.visitSourceFile = function (node) {
        this.exportedClasses = 0;
        _super.prototype.visitSourceFile.call(this, node);
        this.exportedClasses = 0;
    };
    MaxClassExportWalker.prototype.visitClassDeclaration = function (node) {
        var isExport = node.modifiers && node.modifiers.map(function (modifier) { return modifier.kind; }).indexOf(ts.SyntaxKind.ExportKeyword) >= 0;
        if (isExport) {
            this.exportedClasses++;
        }
        if (this.exportedClasses > 1) {
            this.addFailureAtNode(node, 'There should be no more then 1 exported class per file');
        }
        _super.prototype.visitClassDeclaration.call(this, node);
    };
    return MaxClassExportWalker;
}(Lint.RuleWalker));
