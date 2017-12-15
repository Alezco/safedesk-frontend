import * as Lint from 'tslint';
import * as ts from 'typescript';

export class Rule extends Lint.Rules.AbstractRule {
  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new NoPropertyInConstructorWalker(sourceFile, this.getOptions()));
  }
}

/* tslint:disable-next-line:max-classes-per-file */
class NoPropertyInConstructorWalker extends Lint.RuleWalker {

  private errorMessage = 'Properties shouldn\'t be created in constructor';

  public visitConstructorDeclaration(node: ts.ConstructorDeclaration) {
    const keywords = [ts.SyntaxKind.PrivateKeyword, ts.SyntaxKind.ProtectedKeyword, ts.SyntaxKind.PublicKeyword];
    for (const param of node.parameters) {
      if (!param.modifiers) {
        continue;
      }
      for (const modifier of param.modifiers) {
        if (keywords.some((x) => x === modifier.kind)) {
          this.addFailureAtNode(modifier, this.errorMessage, null);
        }
      }
    }
    super.visitConstructorDeclaration(node);
  }
}
