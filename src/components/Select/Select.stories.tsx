import { useState, type FormEvent } from 'react';
import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Grid } from '../Grid';
import { Stack } from '../Stack';
import { Typography } from '../Typography';
import { Button } from '../Button';
import { SelectOption } from '../SelectOption';
import { Select } from './Select';
import type { SelectSize, SelectValue } from './Select.types';

const sizes: readonly SelectSize[] = ['xs', 'sm', 'md', 'lg'];
const roles = [
  { value: 'owner', label: 'Owner' },
  { value: 'editor', label: 'Editor' },
  { value: 'reviewer', label: 'Reviewer' },
  { value: 'viewer', label: 'Viewer' },
] as const;

export function SelectStory() {
  const [role, setRole] = useState<SelectValue>('editor');
  const [event, setEvent] = useState('none');
  const [channels, setChannels] = useState<SelectValue[]>(['email']);
  const [submitted, setSubmitted] = useState('none');
  const submit = (formEvent: FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault();
    setSubmitted(String(new FormData(formEvent.currentTarget).get('region')));
  };
  return (
    <Stack spacing="xl">
      <Example title="Variants and sizes">
        <Grid container columns={{ xs: 1, md: 3 }} spacing="lg">
          {(['outlined', 'filled'] as const).flatMap((variant) =>
            sizes.map((size) => (
              <Select
                key={`${variant}-${size}`}
                variant={variant}
                size={size}
                label={`${variant} ${size}`}
                defaultValue="editor"
                helperText="Helper text"
                fullWidth
                data-testid={`select-${variant}-${size}`}
              >
                {roles.map((option) => (
                  <SelectOption key={option.value} value={option.value}>
                    {option.label}
                  </SelectOption>
                ))}
              </Select>
            )),
          )}
        </Grid>
      </Example>
      <Example title="Controlled, with a disabled option; onChange reports the value and name">
        <Stack direction="row" spacing="lg" alignItems="center">
          <Select
            label="Role"
            name="role"
            value={role}
            onChange={(change) => {
              setRole(change.target.value);
              setEvent(`${change.target.name}=${change.target.value}`);
            }}
            data-testid="select-role"
          >
            {roles.map((option) => (
              <SelectOption
                key={option.value}
                value={option.value}
                disabled={option.value === 'owner'}
              >
                {option.label}
              </SelectOption>
            ))}
          </Select>
          <Button variant="text" data-testid="select-after">
            Invite
          </Button>
          <Typography variant="body-sm" data-testid="select-event">
            {event}
          </Typography>
        </Stack>
      </Example>
      <Example title="Multiple values stay open and join in the field">
        <Stack direction="row" spacing="lg" alignItems="center">
          <Select
            multiple
            label="Channels"
            value={channels}
            onChange={(change) => setChannels(change.target.value)}
            data-testid="select-channels"
          >
            <SelectOption value="email">Email</SelectOption>
            <SelectOption value="slack">Slack</SelectOption>
            <SelectOption value="sms">Text message</SelectOption>
          </Select>
          <Typography variant="body-sm" data-testid="select-channels-value">
            {channels.join(' ')}
          </Typography>
        </Stack>
      </Example>
      <Example title="Forms, validation and states">
        <form onSubmit={submit} data-testid="select-form">
          <Stack direction="row" spacing="lg" alignItems="flex-start">
            <Select label="Region" name="region" required data-testid="select-region">
              <SelectOption value="eu">Europe</SelectOption>
              <SelectOption value="us">United States</SelectOption>
            </Select>
            <Select
              label="Plan"
              defaultValue="team"
              error
              helperText="The team plan has no seats left"
              data-testid="select-plan"
            >
              <SelectOption value="team">Team</SelectOption>
              <SelectOption value="business">Business</SelectOption>
            </Select>
            <Select label="Owner" defaultValue="ana" disabled data-testid="select-disabled">
              <SelectOption value="ana">Ana Popescu</SelectOption>
            </Select>
            <Button type="submit" variant="contained" data-testid="select-submit">
              Save
            </Button>
            <Typography variant="body-sm" data-testid="select-submitted">
              {submitted}
            </Typography>
          </Stack>
        </form>
      </Example>
    </Stack>
  );
}

export const selectStory: Story = {
  id: 'select',
  title: 'Select',
  render: () => <SelectStory />,
};
