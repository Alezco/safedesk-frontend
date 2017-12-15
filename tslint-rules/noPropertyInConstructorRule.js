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
        return this.applyWithWalker(new NoPropertyInConstructorWalker(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
/* tslint:disable-next-line:max-classes-per-file */
var NoPropertyInConstructorWalker = (function (_super) {
    __extends(NoPropertyInConstructorWalker, _super);
    function NoPropertyInConstructorWalker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.errorMessage = 'Properties shouldn\'t be created in constructor';
        return _this;
    }
    NoPropertyInConstructorWalker.prototype.visitConstructorDeclaration = function (node) {
        var keywords = [ts.SyntaxKind.PrivateKeyword, ts.SyntaxKind.ProtectedKeyword, ts.SyntaxKind.PublicKeyword];
        for (var _i = 0, _a = node.parameters; _i < _a.length; _i++) {
            var param = _a[_i];
            if (!param.modifiers) {
                continue;
            }
            var _loop_1 = function (modifier) {
                if (keywords.some(function (x) { return x === modifier.kind; })) {
                    this_1.addFailureAtNode(modifier, this_1.errorMessage, null);
                }
            };
            var this_1 = this;
            for (var _b = 0, _c = param.modifiers; _b < _c.length; _b++) {
                var modifier = _c[_b];
                _loop_1(modifier);
            }
        }
        _super.prototype.visitConstructorDeclaration.call(this, node);
    };
    return NoPropertyInConstructorWalker;
}(Lint.RuleWalker));
