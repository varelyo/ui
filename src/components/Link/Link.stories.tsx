import { useState } from 'react';
import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Grid } from '../Grid';
import { Stack } from '../Stack';
import { Typography } from '../Typography';
import { Checkbox } from '../Checkbox';
import { TextField } from '../TextField';
import { Link } from './Link';
import type { LinkColor, LinkUnderline } from './Link.types';

const linkColors: readonly LinkColor[] = [
  'neutral',
  'primary',
  'secondary',
  'error',
  'warning',
  'info',
  'success',
];
const linkUnderlines: readonly LinkUnderline[] = ['always', 'hover', 'none'];
const linkStates = ['rest', 'hover', 'pressed', 'focus', 'disabled'] as const;

export function LinkStory() {
  return (
    <Stack spacing="xl">
      {linkUnderlines.map((underline) => (
        <Example key={underline} title={`Underline ${underline} in every colour`}>
          <Stack direction="row" spacing="lg" alignItems="baseline">
            {linkColors.map((color) => (
              <Link
                key={color}
                href="#link"
                underline={underline}
                color={color}
                data-testid={`link-${underline}-${color}`}
              >
                {color}
              </Link>
            ))}
            <Link
              href="#link"
              underline={underline}
              disabled
              data-testid={`link-${underline}-disabled`}
            >
              disabled
            </Link>
          </Stack>
        </Example>
      ))}
      <Example title="Text styles only when a variant is set">
        <Stack spacing="sm">
          <Link href="#link" variant="title-md" data-testid="link-variant-title">
            Title style link
          </Link>
          <Link href="#link" variant="label-sm" color="primary" data-testid="link-variant-label">
            Label style link
          </Link>
          <Link
            href="#link"
            variant={{ xs: 'body-sm', md: 'body-lg' }}
            data-testid="link-variant-responsive"
          >
            Body style that grows from the md breakpoint
          </Link>
        </Stack>
      </Example>
    </Stack>
  );
}

export function LinkStatesStory() {
  return (
    <Stack spacing="xl">
      {linkUnderlines.map((underline) => (
        <Example
          key={underline}
          title={`Underline ${underline}: rest, hover, pressed, focus and disabled`}
        >
          <Grid container columns={5} spacing={['xs', 'lg']}>
            {linkColors.flatMap((color) =>
              linkStates.map((state) => (
                <Grid key={`${color}-${state}`} size={1}>
                  <Typography variant="body-md" component="span">
                    <Link
                      href="#link"
                      underline={underline}
                      color={color}
                      disabled={state === 'disabled'}
                      data-state={state === 'rest' || state === 'disabled' ? undefined : state}
                      data-testid={`link-state-${underline}-${color}-${state}`}
                    >
                      {`${color} ${state}`}
                    </Link>
                  </Typography>
                </Grid>
              )),
            )}
          </Grid>
        </Example>
      ))}
    </Stack>
  );
}

export function LinkCompositionsStory() {
  const [presses, setPresses] = useState(0);
  const [agreed, setAgreed] = useState(false);
  return (
    <Stack spacing="xl">
      <Example title="Inside Typography, taking its font, size, weight and line height">
        <Stack spacing="sm">
          <Typography variant="body-md" data-testid="link-in-body">
            Read the{' '}
            <Link href="#terms" data-testid="link-body">
              terms of service
            </Link>{' '}
            before you invite the team.
          </Typography>
          <Typography variant="body-sm" color="on-surface-variant-default">
            Questions?{' '}
            <Link href="#help" color="primary" underline="hover" data-testid="link-body-sm">
              Visit the help centre
            </Link>
            .
          </Typography>
          <Typography variant="title-md" data-testid="link-in-title">
            <Link href="#plans" underline="none" data-testid="link-title">
              Compare plans
            </Link>
          </Typography>
        </Stack>
      </Example>
      <Example title="Inside a Checkbox label and helper text">
        <Stack spacing="lg">
          <Checkbox
            checked={agreed}
            onChange={(_, checked) => setAgreed(checked)}
            data-testid="link-checkbox"
            label={
              <>
                I agree to the{' '}
                <Link href="#terms" data-testid="link-checkbox-terms">
                  terms
                </Link>
              </>
            }
          />
          <TextField
            label="Password"
            type="password"
            data-testid="link-field"
            helperText={
              <>
                Use 12 characters or more.{' '}
                <Link href="#rules" data-testid="link-helper">
                  Password rules
                </Link>
              </>
            }
          />
        </Stack>
      </Example>
      <Example title="On its own, as a button and opening another window">
        <Stack direction="row" spacing="lg" alignItems="baseline">
          <Link href="#all" color="primary" data-testid="link-standalone">
            View all invoices
          </Link>
          <Link
            component="button"
            onClick={() => setPresses((count) => count + 1)}
            data-testid="link-button"
          >
            {`Resend code (${presses})`}
          </Link>
          <Link component="button" disabled data-testid="link-button-disabled">
            Resend disabled
          </Link>
          <Link
            href="https://example.com"
            target="_blank"
            rel="noreferrer"
            data-testid="link-external"
          >
            Status page
          </Link>
        </Stack>
      </Example>
    </Stack>
  );
}

export const linkStory: Story = {
  id: 'link',
  title: 'Link',
  render: () => <LinkStory />,
};

export const linkStatesStory: Story = {
  id: 'link-states',
  title: 'Link states',
  render: () => <LinkStatesStory />,
};

export const linkCompositionsStory: Story = {
  id: 'link-compositions',
  title: 'Link compositions',
  render: () => <LinkCompositionsStory />,
};
