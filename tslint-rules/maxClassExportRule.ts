import * as Lint from 'tslint';
import * as ts from 'typescript';

export class Rule extends Lint.Rules.AbstractRule {
  public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
    return this.applyWithWalker(new MaxClassExportWalker(sourceFile, this.getOptions()));
  }
}

class MaxClassExportWalker extends Lint.RuleWalker {

  private exportedClasses = 0;

  public visitSourceFile(node: ts.SourceFile) {
    this.exportedClasses = 0;
    super.visitSourceFile(node);
    this.exportedClasses = 0;
  }

  public visitClassDeclaration(node: ts.ClassDeclaration) {
    const isExport = node.modifiers && node.modifiers.map((modifier) => modifier.kind).indexOf(ts.SyntaxKind.ExportKeyword) >= 0;
    if (isExport) {
      this.exportedClasses++;
    }

    if (this.exportedClasses > 1) {
      this.addFailureAtNode(node, 'There should be no more then 1 exported class per file');
    }

    super.visitClassDeclaration(node);
  }

}
