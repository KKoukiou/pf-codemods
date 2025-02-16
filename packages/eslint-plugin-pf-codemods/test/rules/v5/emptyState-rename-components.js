const ruleTester = require("../../ruletester");
const rule = require("../../../lib/rules/v5/emptyState-rename-components");

ruleTester.run("emptyState-rename-components", rule, {
  valid: [
    {
      code: `import { EmptyStateActions } from '@patternfly/react-core';
      <>
        <EmptyStateActions>Primary action</EmptyStateActions>
        <EmptyStateActions>Other actions</EmptyStateActions>
      </>`,
    },
    {
      // No @patternfly/react-core import
      code: `<>
        <EmptyStatePrimary>Primary action</EmptyStatePrimary>
        <EmptyStateSecondaryActions>Other actions</EmptyStateSecondaryActions>
      </>`,
    },
  ],
  invalid: [
    {
      code: `import { EmptyStateSecondaryActions } from '@patternfly/react-core'; <EmptyStateSecondaryActions>Other actions</EmptyStateSecondaryActions>`,
      output: `import { EmptyStateSecondaryActions, EmptyStateActions } from '@patternfly/react-core'; <EmptyStateActions>Other actions</EmptyStateActions>`,
      errors: [
        {
          message:
            "add missing imports EmptyStateActions from @patternfly/react-core",
          type: "ImportDeclaration",
        },
        {
          message:
            "EmptyStateSecondaryActions has been replaced with EmptyStateActions",
          type: "JSXElement",
        },
      ],
    },
    { // after second run of the rule
      code: `import { EmptyStateSecondaryActions, EmptyStateActions } from '@patternfly/react-core'; <EmptyStateActions>Other actions</EmptyStateActions>`,
      output: `import { EmptyStateActions } from '@patternfly/react-core'; <EmptyStateActions>Other actions</EmptyStateActions>`,
      errors: [
        {
          message: "unused patternfly import EmptyStateSecondaryActions",
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `import { EmptyStatePrimary } from '@patternfly/react-core'; <EmptyStatePrimary>Primary action</EmptyStatePrimary>`,
      output: `import { EmptyStatePrimary, EmptyStateActions } from '@patternfly/react-core'; <EmptyStateActions>Primary action</EmptyStateActions>`,
      errors: [
        {
          message:
            "add missing imports EmptyStateActions from @patternfly/react-core",
          type: "ImportDeclaration",
        },
        {
          message: "EmptyStatePrimary has been replaced with EmptyStateActions",
          type: "JSXElement",
        },
      ],
    },
    { // after second run of the rule
      code: `import { EmptyStatePrimary, EmptyStateActions } from '@patternfly/react-core'; <EmptyStateActions>Primary action</EmptyStateActions>`,
      output: `import { EmptyStateActions } from '@patternfly/react-core'; <EmptyStateActions>Primary action</EmptyStateActions>`,
      errors: [
        {
          message: "unused patternfly import EmptyStatePrimary",
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `import { EmptyStatePrimary as Primary } from '@patternfly/react-core'; <Primary>Primary action</Primary>`,
      output: `import { EmptyStatePrimary as Primary, EmptyStateActions } from '@patternfly/react-core'; <EmptyStateActions>Primary action</EmptyStateActions>`,
      errors: [
        {
          message:
            "add missing imports EmptyStateActions from @patternfly/react-core",
          type: "ImportDeclaration",
        },
        {
          message: "EmptyStatePrimary has been replaced with EmptyStateActions",
          type: "JSXElement",
        },
      ],
    },
    { // after second run of the rule
      code: `import { EmptyStatePrimary as Primary, EmptyStateActions } from '@patternfly/react-core'; <EmptyStateActions>Primary action</EmptyStateActions>`,
      output: `import { EmptyStateActions } from '@patternfly/react-core'; <EmptyStateActions>Primary action</EmptyStateActions>`,
      errors: [
        {
          message:
            "unused patternfly import Primary",
          type: "ImportDeclaration",
        },
      ],
    },
    {
      code: `import { EmptyStatePrimary, EmptyStateSecondaryActions } from '@patternfly/react-core';
      <>
        <EmptyStatePrimary>Primary action</EmptyStatePrimary>
        <EmptyStateSecondaryActions>Secondary</EmptyStateSecondaryActions>
      </>`,
      output: `import { EmptyStatePrimary, EmptyStateSecondaryActions, EmptyStateActions } from '@patternfly/react-core';
      <>
        <EmptyStateActions>Primary action</EmptyStateActions>
        <EmptyStateActions>Secondary</EmptyStateActions>
      </>`,
      errors: [
        {
          message: "add missing imports EmptyStateActions from @patternfly/react-core",
          type: "ImportDeclaration",
        },
        {
          message: "EmptyStatePrimary has been replaced with EmptyStateActions",
          type: "JSXElement",
        },
        {
          message:
            "EmptyStateSecondaryActions has been replaced with EmptyStateActions",
          type: "JSXElement",
        },
      ],
    },
    { // after second run of the rule
      code: `import { EmptyStatePrimary, EmptyStateSecondaryActions, EmptyStateActions } from '@patternfly/react-core';
      <>
        <EmptyStateActions>Primary action</EmptyStateActions>
        <EmptyStateActions>Secondary</EmptyStateActions>
      </>`,
      output: `import { EmptyStateSecondaryActions, EmptyStateActions } from '@patternfly/react-core';
      <>
        <EmptyStateActions>Primary action</EmptyStateActions>
        <EmptyStateActions>Secondary</EmptyStateActions>
      </>`,
      errors: [
        {
          message: "unused patternfly import EmptyStatePrimary",
          type: "ImportDeclaration",
        },
        {
          message: "unused patternfly import EmptyStateSecondaryActions",
          type: "ImportDeclaration",
        },
      ],
    },
    { // after third run of the rule
      code: `import { EmptyStateSecondaryActions, EmptyStateActions } from '@patternfly/react-core';
      <>
        <EmptyStateActions>Primary action</EmptyStateActions>
        <EmptyStateActions>Secondary</EmptyStateActions>
      </>`,
      output: `import { EmptyStateActions } from '@patternfly/react-core';
      <>
        <EmptyStateActions>Primary action</EmptyStateActions>
        <EmptyStateActions>Secondary</EmptyStateActions>
      </>`,
      errors: [
        {
          message: "unused patternfly import EmptyStateSecondaryActions",
          type: "ImportDeclaration",
        },
      ],
    },
  ],
});
