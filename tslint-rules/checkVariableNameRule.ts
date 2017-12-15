import * as Lint from 'tslint';
import * as ts from 'typescript';

export class Rule extends Lint.Rules.AbstractRule {
  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new CheckVariableNameWalker(sourceFile, this.getOptions()));
  }
}

/* tslint:disable-next-line:max-classes-per-file */
class CheckVariableNameWalker extends Lint.RuleWalker {

  private withinModel = false;
  private withinFormObject = false;

  public visitClassDeclaration(node: ts.ClassDeclaration) {
    if (node.name.text.indexOf('FormObject') === 0) {
      const savedWithinFormObject = this.withinFormObject;
      this.withinFormObject = true;
      super.visitClassDeclaration(node);
      this.withinFormObject = savedWithinFormObject;
    } else if (node.name.text.match(/Model/g)) {
      const savedWithingModel = this.withinModel;
      this.withinModel = true;
      super.visitClassDeclaration(node);
      this.withinModel = savedWithingModel;
    } else {
      super.visitClassDeclaration(node);
    }
  }

  public visitPropertyDeclaration(node: ts.PropertyDeclaration) {
    const variableName = node.name.getText(node.getSourceFile());
    const isReadonly = node.modifiers && node.modifiers.map((modifier) => modifier.kind).indexOf(ts.SyntaxKind.ReadonlyKeyword) >= 0;
    if (isReadonly) {
      if (variableName.toUpperCase() !== variableName) {
        this.addFailureAtNode(node, 'Readonly variables should be in upper case');
      }
      return;
    }
    const hasUnderscore = variableName.indexOf('_') >= 0;
    if (hasUnderscore && !this.withinFormObject && !this.withinModel) {
      this.addFailureAtNode(node.name, 'Variable names should\'t contain underscores');
    }
    super.visitPropertyDeclaration(node);
  }

}
