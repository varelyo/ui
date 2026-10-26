import { useState } from 'react';
import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Stack } from '../Stack';
import { Typography } from '../Typography';
import { ButtonBase } from './ButtonBase';

export function ButtonBaseStory() {
  const [count, setCount] = useState(0);
  return (
    <Stack spacing="xl">
      <Example title="Unstyled interaction base: native button, link and custom element">
        <Stack direction="row" spacing="lg" alignItems="center">
          <ButtonBase onClick={() => setCount((value) => value + 1)} data-testid="base-native">
            Native button
          </ButtonBase>
          <ButtonBase href="#base" data-testid="base-link">
            Link
          </ButtonBase>
          <ButtonBase
            component="div"
            onClick={() => setCount((value) => value + 1)}
            data-testid="base-custom"
          >
            Custom element
          </ButtonBase>
          <ButtonBase disabled onClick={() => setCount((value) => value + 100)}>
            Disabled
          </ButtonBase>
          <ButtonBase loading onClick={() => setCount((value) => value + 100)}>
            Loading
          </ButtonBase>
        </Stack>
      </Example>
      <Typography variant="body-sm" color="on-surface-variant-default" data-testid="base-count">
        {`Activated ${count}`}
      </Typography>
    </Stack>
  );
}

export const buttonBaseStory: Story = {
  id: 'button-base',
  title: 'ButtonBase',
  render: () => <ButtonBaseStory />,
};
