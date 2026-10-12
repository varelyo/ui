import { useState } from 'react';
import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Grid } from '../../foundation/Grid';
import { Icon } from '../../foundation/Icon';
import { Stack } from '../../foundation/Stack';
import { Button } from './Button';
import type { ButtonColor, ButtonSize, ButtonVariant } from './Button.types';

const buttonVariants: readonly ButtonVariant[] = ['contained', 'outlined', 'text'];
const colors: readonly ButtonColor[] = [
  'primary',
  'secondary',
  'error',
  'warning',
  'info',
  'success',
];
const sizes: readonly ButtonSize[] = ['sm', 'md', 'lg'];

export function ButtonStory() {
  const [count, setCount] = useState(0);
  return (
    <Stack spacing="xl">
      <Example title="Variants and colours">
        <Stack spacing="sm">
          {buttonVariants.map((variant) => (
            <Stack key={variant} direction="row" spacing="sm" alignItems="center">
              {colors.map((color) => (
                <Button key={color} variant={variant} color={color}>
                  {color}
                </Button>
              ))}
              <Button variant={variant} disabled>
                disabled
              </Button>
            </Stack>
          ))}
        </Stack>
      </Example>
      <Example title="Sizes">
        <Stack spacing="sm">
          {buttonVariants.map((variant) => (
            <Stack key={variant} direction="row" spacing="sm" alignItems="center">
              {sizes.map((size) => (
                <Button key={size} variant={variant} size={size} startIcon={<Icon name="add" />}>
                  {`Create ${size}`}
                </Button>
              ))}
            </Stack>
          ))}
        </Stack>
      </Example>
      <Example title="Icons">
        <Stack direction="row" spacing="sm" alignItems="center">
          <Button variant="contained" startIcon={<Icon name="download" />}>
            Download
          </Button>
          <Button variant="outlined" endIcon={<Icon name="arrow-right" />}>
            Continue
          </Button>
          <Button variant="text" startIcon={<Icon name="trash" />} color="error">
            Delete
          </Button>
        </Stack>
      </Example>
      <Example title="Loading keeps the accessible name">
        <Stack direction="row" spacing="sm" alignItems="center">
          <Button
            variant="contained"
            loading
            loadingPosition="start"
            startIcon={<Icon name="upload" />}
          >
            Uploading
          </Button>
          <Button variant="contained" loading data-testid="loading-center">
            Saving
          </Button>
          <Button
            variant="outlined"
            loading
            loadingPosition="end"
            endIcon={<Icon name="arrow-right" />}
          >
            Sending
          </Button>
        </Stack>
      </Example>
      <Example title="Interaction">
        <Stack direction="row" spacing="sm" alignItems="center">
          <Button
            variant="contained"
            onClick={() => setCount((value) => value + 1)}
            data-testid="counter"
          >
            {`Clicked ${count}`}
          </Button>
          <Button
            variant="outlined"
            disabled
            onClick={() => setCount((value) => value + 100)}
            data-testid="disabled"
          >
            Disabled
          </Button>
          <Button
            variant="outlined"
            loading
            onClick={() => setCount((value) => value + 100)}
            data-testid="busy"
          >
            Busy
          </Button>
          <Button
            href="#docs"
            variant="text"
            endIcon={<Icon name="external-link" />}
            data-testid="link"
          >
            Documentation
          </Button>
          <Button
            component="div"
            variant="text"
            onClick={() => setCount((value) => value + 1)}
            data-testid="custom"
          >
            Custom element
          </Button>
        </Stack>
      </Example>
      <Example title="Responsive size, full width and long labels">
        <Grid container columns={{ xs: 1, md: 3 }} spacing="md">
          <Button variant="contained" size={{ xs: 'sm', md: 'lg' }} data-testid="responsive-button">
            Small on phones
          </Button>
          <Button variant="outlined" fullWidth>
            Full width
          </Button>
          <Button variant="contained" color="secondary">
            A deliberately long label that has to wrap inside a narrow column without clipping
          </Button>
        </Grid>
      </Example>
    </Stack>
  );
}

export const buttonStory: Story = {
  id: 'button',
  title: 'Button',
  render: () => <ButtonStory />,
};
