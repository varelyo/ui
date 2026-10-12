import { Stack } from '../../src';
import { ContainerWidthExample } from '../../src/foundation/Container/Container.stories';
import { GridColumnsExample, GridSpanExample } from '../../src/foundation/Grid/Grid.stories';
import {
  StackDirectionExample,
  StackDisplayExample,
  StackPaddingExample,
} from '../../src/foundation/Stack/Stack.stories';

export function LayoutStory() {
  return (
    <Stack spacing="xl">
      <StackDirectionExample />
      <StackPaddingExample />
      <GridColumnsExample />
      <GridSpanExample />
      <StackDisplayExample />
      <ContainerWidthExample />
    </Stack>
  );
}
