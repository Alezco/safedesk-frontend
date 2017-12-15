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
        return this.applyWithWalker(new CheckVariableNameWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
/* tslint:disable-next-line:max-classes-per-file */
var CheckVariableNameWalker = (function (_super) {
    __extends(CheckVariableNameWalker, _super);
    function CheckVariableNameWalker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.errorMessage = 'Properties shouldn\'t be created in constructor';
        _this.withinModel = false;
        _this.withinFormObject = false;
        return _this;
    }
    CheckVariableNameWalker.prototype.visitClassDeclaration = function (node) {
        if (node.name.text.indexOf('FormObject') === 0) {
            var savedWithinFormObject = this.withinFormObject;
            this.withinFormObject = true;
            _super.prototype.visitClassDeclaration.call(this, node);
            this.withinFormObject = savedWithinFormObject;
        }
        else if (node.name.text.match(/Model/g)) {
            var savedWithingModel = this.withinModel;
            this.withinModel = true;
            _super.prototype.visitClassDeclaration.call(this, node);
            this.withinModel = savedWithingModel;
        }
        else {
            _super.prototype.visitClassDeclaration.call(this, node);
        }
    };
    CheckVariableNameWalker.prototype.visitPropertyDeclaration = function (node) {
        var variableName = node.name.getText(node.getSourceFile());
        var isReadonly = node.modifiers && node.modifiers.map(function (modifier) { return modifier.kind; }).indexOf(ts.SyntaxKind.ReadonlyKeyword) >= 0;
        if (isReadonly) {
            if (variableName.toUpperCase() !== variableName) {
                this.addFailureAtNode(node, 'Readonly variables should be in upper case');
            }
            return;
        }
        var hasUnderscore = variableName.indexOf('_') >= 0;
        if (hasUnderscore && !this.withinFormObject && !this.withinModel) {
            this.addFailureAtNode(node.name, 'Variable names should\'t contain underscores');
        }
        _super.prototype.visitPropertyDeclaration.call(this, node);
    };
    return CheckVariableNameWalker;
}(Lint.RuleWalker));
