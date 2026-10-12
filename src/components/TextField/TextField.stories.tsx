import { useState } from 'react';
import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Grid } from '../../foundation/Grid';
import { Icon } from '../../foundation/Icon';
import { Stack } from '../../foundation/Stack';
import { Typography } from '../../foundation/Typography';
import { Button } from '../Button';
import { TextField } from './TextField';
import type { TextFieldSize } from './TextField.types';

const sizes: readonly TextFieldSize[] = ['sm', 'md', 'lg'];

export function TextFieldStory() {
  const [amount, setAmount] = useState<string | number>(0);
  const [visible, setVisible] = useState(false);
  return (
    <Stack spacing="xl">
      <Example title="Variants and sizes">
        <Grid container columns={{ xs: 1, md: 3 }} spacing="lg">
          {(['outlined', 'filled'] as const).flatMap((variant) =>
            sizes.map((size) => (
              <TextField
                key={`${variant}-${size}`}
                variant={variant}
                size={size}
                label={`${variant} ${size}`}
                placeholder="Placeholder"
                helperText="Helper text"
                fullWidth
              />
            )),
          )}
        </Grid>
      </Example>
      <Example title="States">
        <Grid container columns={{ xs: 1, md: 4 }} spacing="lg">
          <TextField label="Email" defaultValue="hello@example.com" fullWidth />
          <TextField
            label="Email"
            defaultValue="hello@"
            error
            helperText="Enter a complete address"
            fullWidth
          />
          <TextField
            label="Disabled"
            defaultValue="Unavailable"
            disabled
            helperText="Locked by policy"
            fullWidth
          />
          <TextField label="Read only" defaultValue="REF-2048" readOnly fullWidth />
        </Grid>
      </Example>
      <Example title="Adornments">
        <Grid container columns={{ xs: 1, md: 2 }} spacing="lg">
          <TextField
            label="Search"
            placeholder="Search projects"
            startAdornment={<Icon name="search" />}
            fullWidth
          />
          <TextField
            label="Password"
            type={visible ? 'text' : 'password'}
            defaultValue="correct horse"
            endAdornment={
              <Button
                variant="text"
                size="sm"
                aria-label={visible ? 'Hide password' : 'Show password'}
                onClick={() => setVisible((value) => !value)}
                startIcon={<Icon name={visible ? 'eye-off' : 'eye'} />}
              />
            }
            fullWidth
          />
        </Grid>
      </Example>
      <Example title="Multiline and controlled value 0">
        <Grid container columns={{ xs: 1, md: 3 }} spacing="lg">
          <TextField label="Notes" multiline rows={3} placeholder="Three fixed rows" fullWidth />
          <TextField
            label="Autosize"
            multiline
            minRows={2}
            maxRows={5}
            placeholder="Grows from two to five rows"
            fullWidth
            data-testid="autosize"
          />
          <Stack spacing="xs">
            <TextField
              label="Amount"
              type="number"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              data-testid="amount"
              fullWidth
            />
            <Typography
              variant="body-sm"
              color="on-surface-variant-default"
              data-testid="amount-echo"
            >
              {`Value: ${String(amount)}`}
            </Typography>
          </Stack>
        </Grid>
      </Example>
    </Stack>
  );
}

export const textFieldStory: Story = {
  id: 'text-field',
  title: 'TextField',
  render: () => <TextFieldStory />,
};

const chosenNames = (target: EventTarget) =>
  target instanceof HTMLInputElement
    ? Array.from(target.files ?? [], (file) => file.name).join(', ')
    : '';

export function TextFieldFileStory() {
  const [chosen, setChosen] = useState('');
  return (
    <Stack spacing="xl">
      <Example title="File mode: variants and sizes">
        <Grid container columns={{ xs: 1, md: 3 }} spacing="lg">
          {(['outlined', 'filled'] as const).flatMap((variant) =>
            sizes.map((size) => (
              <TextField
                key={`${variant}-${size}`}
                type="file"
                variant={variant}
                size={size}
                label={`${variant} ${size}`}
                helperText="PDF, up to 10 MB"
                accept="application/pdf"
                fullWidth
              />
            )),
          )}
        </Grid>
      </Example>
      <Example title="File mode: states">
        <Grid container columns={{ xs: 1, md: 4 }} spacing="lg">
          <TextField type="file" label="Signed contract" name="contract" required fullWidth />
          <TextField
            type="file"
            label="Invoice"
            error
            helperText="Attach the signed invoice"
            fullWidth
          />
          <TextField
            type="file"
            label="Disabled"
            disabled
            helperText="Uploads are closed"
            fullWidth
          />
          <TextField
            type="file"
            label="Attachments"
            multiple
            startAdornment={<Icon name="file" />}
            fullWidth
          />
        </Grid>
      </Example>
      <Example title="File mode: the native change event">
        <Stack spacing="xs">
          <TextField
            type="file"
            label="Documents"
            multiple
            accept=".pdf,.txt"
            onChange={(event) => setChosen(chosenNames(event.target))}
            data-testid="documents"
            fullWidth
          />
          <Typography
            variant="body-sm"
            color="on-surface-variant-default"
            data-testid="documents-echo"
          >
            {chosen ? `Chosen: ${chosen}` : 'Nothing chosen'}
          </Typography>
        </Stack>
      </Example>
    </Stack>
  );
}

export const textFieldFileStory: Story = {
  id: 'text-field-file',
  title: 'TextField file mode',
  render: () => <TextFieldFileStory />,
};
