import { Stack } from '../../src';
import { ContainerWidthExample } from '../../src/components/Container/Container.stories';
import { GridColumnsExample, GridSpanExample } from '../../src/components/Grid/Grid.stories';
import {
  StackDirectionExample,
  StackDisplayExample,
  StackPaddingExample,
} from '../../src/components/Stack/Stack.stories';

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
