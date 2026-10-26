import { useState, type ReactNode } from 'react';
import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Grid } from '../Grid';
import { Icon, type IconName } from '../Icon';
import { Stack } from '../Stack';
import { Avatar } from '../Avatar';
import { Collapse } from '../Collapse';
import { IconButton } from '../IconButton';
import { ListItem } from '../ListItem';
import { ListItemAvatar } from '../ListItemAvatar';
import { ListItemButton } from '../ListItemButton';
import { ListItemIcon } from '../ListItemIcon';
import { ListItemText } from '../ListItemText';
import { ListSubheader } from '../ListSubheader';
import { Paper } from '../Paper';
import { Switch } from '../Switch';
import { List } from './List';
import type { ListColor, ListSize } from './List.types';

const sizes: readonly ListSize[] = ['xs', 'sm', 'md', 'lg'];
const colors: readonly ListColor[] = ['neutral', 'primary', 'secondary'];

function Row({
  icon,
  label,
  secondary,
  end,
  selected,
  disabled,
  href,
  testId,
}: {
  icon: IconName;
  label: string;
  secondary?: string;
  end?: string;
  selected?: boolean;
  disabled?: boolean;
  href?: string;
  testId?: string;
}) {
  const content = (
    <>
      <ListItemIcon>
        <Icon name={icon} />
      </ListItemIcon>
      <ListItemText primary={label} secondary={secondary} />
    </>
  );
  return (
    <ListItem end={end}>
      {href ? (
        <ListItemButton href={href} data-testid={testId}>
          {content}
        </ListItemButton>
      ) : (
        <ListItemButton
          selected={selected ?? false}
          disabled={disabled ?? false}
          data-testid={testId}
        >
          {content}
        </ListItemButton>
      )}
    </ListItem>
  );
}

export function ListStory() {
  return (
    <Stack spacing="xl">
      <Example title="Sizes sm, md, lg and xl: rest, selected, two lines, an end count, disabled and a link">
        <Grid container columns={{ xs: 1, md: 2, lg: 4 }} spacing="lg">
          {sizes.map((size) => (
            <Paper key={size} variant="outlined">
              <List size={size} aria-label={`Size ${size}`} data-testid={`list-${size}`}>
                <Row icon="mail" label="Inbox" end="12" testId={`list-${size}-inbox`} />
                <Row icon="folder" label="Projects" selected testId={`list-${size}-projects`} />
                <Row
                  icon="calendar"
                  label="Calendar"
                  secondary="Design review at 14:00"
                  testId={`list-${size}-calendar`}
                />
                <Row icon="lock" label="Archive" disabled testId={`list-${size}-archive`} />
                <Row icon="help" label="Help centre" href="#help" testId={`list-${size}-help`} />
              </List>
            </Paper>
          ))}
        </Grid>
      </Example>
      <Example title="Colours of the current item: neutral by default, primary and secondary, with its second line and end">
        <Grid container columns={{ xs: 1, md: 3 }} spacing="lg">
          {colors.map((color) => (
            <Paper key={color} variant="outlined">
              <List
                color={color}
                aria-label={`Colour ${color}`}
                data-testid={`list-color-${color}`}
              >
                <Row icon="dashboard" label="Overview" testId={`list-${color}-overview`} />
                <Row
                  icon="users"
                  label="Members"
                  secondary="Eight people"
                  end="8"
                  selected
                  testId={`list-${color}-members`}
                />
                <Row icon="lock" label="Archive" disabled testId={`list-${color}-archive`} />
              </List>
            </Paper>
          ))}
        </Grid>
      </Example>
      <Example title="Keyboard focus">
        <Grid container columns={{ xs: 1, md: 3 }} spacing="lg">
          <Paper variant="outlined">
            <List aria-label="Focus">
              <ListItem>
                <ListItemButton autoFocus data-testid="list-autofocus">
                  <ListItemIcon>
                    <Icon name="search" />
                  </ListItemIcon>
                  <ListItemText primary="Search" />
                </ListItemButton>
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Example>
    </Stack>
  );
}

export const listStory: Story = {
  id: 'list',
  title: 'List',
  render: () => <ListStory />,
};

const states: readonly { state: string; label: string; selected?: boolean; disabled?: boolean }[] =
  [
    { state: 'rest', label: 'Rest' },
    { state: 'hover', label: 'Hover' },
    { state: 'pressed', label: 'Pressed' },
    { state: 'focus', label: 'Keyboard focus' },
    { state: 'selected', label: 'Selected', selected: true },
    { state: 'selected-hover', label: 'Selected, hover', selected: true },
    { state: 'selected-pressed', label: 'Selected, pressed', selected: true },
    { state: 'selected-focus', label: 'Selected, keyboard focus', selected: true },
    { state: 'disabled', label: 'Disabled', disabled: true },
  ];

export function ListStatesStory() {
  return (
    <Stack spacing="xl">
      {sizes.map((size) => (
        <Example
          key={size}
          title={`Every state at ${size} in each colour: the visual test holds hover, press and keyboard focus on the rows that name them`}
        >
          <Grid container columns={{ xs: 1, md: 3 }} spacing="lg">
            {colors.map((color) => (
              <Paper key={color} variant="outlined">
                <List size={size} color={color} aria-label={`States ${size} ${color}`}>
                  {states.map(({ state, label, selected, disabled }) => (
                    <ListItem key={state} end="4">
                      <ListItemButton
                        selected={selected ?? false}
                        disabled={disabled ?? false}
                        data-state={state}
                        data-testid={`list-state-${size}-${color}-${state}`}
                      >
                        <ListItemIcon>
                          <Icon name="folder" />
                        </ListItemIcon>
                        <ListItemText primary={label} secondary="Second line" />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            ))}
          </Grid>
        </Example>
      ))}
    </Stack>
  );
}

export const listStatesStory: Story = {
  id: 'list-states',
  title: 'List states',
  render: () => <ListStatesStory />,
};

function Team({
  name,
  icon,
  open,
  onToggle,
  children,
}: {
  name: string;
  icon: IconName;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  const id = `list-team-${name.toLowerCase()}`;
  return (
    <ListItem end={<Icon name={open ? 'chevron-up' : 'chevron-down'} />}>
      <ListItemButton
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={id}
        data-testid={`${id}-toggle`}
      >
        <ListItemIcon>
          <Icon name={icon} />
        </ListItemIcon>
        <ListItemText primary={name} noWrap />
      </ListItemButton>
      <Collapse in={open}>
        <List nested id={id} aria-label={name} data-testid={id}>
          {children}
        </List>
      </Collapse>
    </ListItem>
  );
}

export function ListCompositionsStory() {
  const [engineering, setEngineering] = useState(true);
  const [design, setDesign] = useState(false);
  const [current, setCurrent] = useState('Projects');
  const destination = (name: string, icon: IconName, end?: string) => (
    <ListItem key={name} end={end}>
      <ListItemButton
        selected={current === name}
        onClick={() => setCurrent(name)}
        data-testid={`list-nested-${name}`}
      >
        <ListItemIcon>
          <Icon name={icon} />
        </ListItemIcon>
        <ListItemText primary={name} noWrap />
      </ListItemButton>
    </ListItem>
  );
  return (
    <Stack spacing="xl">
      <Example title="Group labels, a nested level in Collapse and the end slot">
        <Grid container columns={{ xs: 1, md: 2, lg: 3 }} spacing="lg">
          <Paper variant="outlined">
            <List subheader="Workspace" aria-label="Workspace" data-testid="list-workspace">
              <ListItem end="12">
                <ListItemButton href="#inbox" data-testid="list-inbox">
                  <ListItemIcon>
                    <Icon name="mail" />
                  </ListItemIcon>
                  <ListItemText primary="Inbox" noWrap />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton data-testid="list-my-issues">
                  <ListItemIcon>
                    <Icon name="star" />
                  </ListItemIcon>
                  <ListItemText primary="My issues" noWrap />
                </ListItemButton>
              </ListItem>
              <ListSubheader data-testid="list-teams-label">Your teams</ListSubheader>
              <Team
                name="Engineering"
                icon="users"
                open={engineering}
                onToggle={() => setEngineering((value) => !value)}
              >
                {destination('Issues', 'file', '3')}
                {destination('Projects', 'folder')}
                {destination('Views', 'eye')}
              </Team>
              <Team
                name="Design"
                icon="image"
                open={design}
                onToggle={() => setDesign((value) => !value)}
              >
                {destination('Briefs', 'file')}
                {destination('Reviews', 'check-circle')}
              </Team>
            </List>
          </Paper>
          <Paper variant="outlined">
            <List aria-label="Settings" data-testid="list-settings">
              <ListSubheader inset color="primary">
                Notifications
              </ListSubheader>
              <ListItem
                divider
                end={<Switch defaultChecked aria-label="Email digest" data-testid="list-switch" />}
              >
                <ListItemIcon>
                  <Icon name="mail" />
                </ListItemIcon>
                <ListItemText primary="Email digest" secondary="A summary of the week" />
              </ListItem>
              <ListItem divider end={<Switch aria-label="Mentions" />}>
                <ListItemText inset primary="Mentions" secondary="When someone writes your name" />
              </ListItem>
              <ListSubheader inset color="secondary">
                Members
              </ListSubheader>
              <ListItem
                alignItems="flex-start"
                end={
                  <IconButton aria-label="Remove Mira Holt" size="sm" data-testid="list-action">
                    <Icon name="trash" />
                  </IconButton>
                }
              >
                <ListItemAvatar>
                  <Avatar size="sm">MH</Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary="Mira Holt"
                  secondary="Designer, joined in March and leads the review of every brief"
                />
              </ListItem>
              <ListItem disableGutters>
                <ListItemText
                  primary="Without gutters"
                  secondary="disableGutters"
                  primaryVariant="body-md"
                  secondaryVariant="label-sm"
                />
              </ListItem>
            </List>
          </Paper>
          <Paper variant="outlined">
            <List disablePadding aria-label="Labels" data-testid="list-flush">
              <ListItem disablePadding>
                <ListItemButton divider>
                  <ListItemText primary="Without padding" secondary="disablePadding" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton divider disableGutters>
                  <ListItemText primary="A button without gutters" />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton alignItems="flex-start" size="lg">
                  <ListItemIcon>
                    <Icon name="information" />
                  </ListItemIcon>
                  <ListItemText
                    primary="A larger row in a medium list"
                    secondary="size on one button overrides the list size"
                  />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemIcon size="lg">
                  <Icon name="star" />
                </ListItemIcon>
                <ListItemText primary="A static row" secondary="with a larger icon" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Example>
      <Example title="A sticky group label with the surface behind it">
        <Grid container columns={{ xs: 1, md: 3 }} spacing="lg">
          <Paper variant="outlined" data-testid="list-scroll">
            <List aria-label="Sticky">
              <ListSubheader sticky data-testid="list-sticky">
                Recent
              </ListSubheader>
              {['Roadmap', 'Retro notes', 'Hiring plan'].map((name) => (
                <ListItem key={name}>
                  <ListItemButton>
                    <ListItemText primary={name} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
      </Example>
    </Stack>
  );
}

export const listCompositionsStory: Story = {
  id: 'list-compositions',
  title: 'List compositions',
  render: () => <ListCompositionsStory />,
};

const features = ['Unlimited projects', 'Ten guests per project', 'Version history for 90 days'];
const steps = ['Create a workspace', 'Invite your team', 'Connect a repository'];

export function ListMarkersStory() {
  return (
    <Stack spacing="xl">
      <Example title="Bullets for a plan's features and numbers for steps, in every colour">
        <Grid container columns={{ xs: 1, lg: 3 }} spacing="lg">
          {colors.map((color) => (
            <Stack key={color} spacing="md">
              <List
                color={color}
                aria-label={`Features, ${color}`}
                data-testid={`list-bullets-${color}`}
              >
                {features.map((feature) => (
                  <ListItem key={feature} marker="bullet">
                    {feature}
                  </ListItem>
                ))}
              </List>
              <List
                component="ol"
                color={color}
                aria-label={`Steps, ${color}`}
                data-testid={`list-numbers-${color}`}
              >
                {steps.map((step) => (
                  <ListItem key={step} marker="number">
                    {step}
                  </ListItem>
                ))}
              </List>
            </Stack>
          ))}
        </Grid>
      </Example>
      <Example title="Every size">
        <Grid container columns={{ xs: 2, lg: 4 }} spacing="lg">
          {sizes.map((size) => (
            <List
              key={size}
              size={size}
              component="ol"
              aria-label={`Steps, ${size}`}
              data-testid={`list-markers-${size}`}
            >
              {steps.map((step) => (
                <ListItem key={step} marker="number">
                  {step}
                </ListItem>
              ))}
              <ListItem marker="bullet">A bullet beside the numbers</ListItem>
            </List>
          ))}
        </Grid>
      </Example>
      <Example title="On the baseline of the first line, past nine, and a nested list counting anew">
        <Paper variant="outlined">
          <List component="ol" aria-label="Release checklist" data-testid="list-markers-long">
            {Array.from({ length: 11 }, (_, index) => (
              <ListItem key={index} marker="number" alignItems="baseline">
                <ListItemText
                  primary={`Check ${index + 1}`}
                  secondary={index === 0 ? 'A second line under the first check.' : undefined}
                />
              </ListItem>
            ))}
            <ListItem alignItems="flex-start">
              <ListItemText primary="Notes" />
              <List nested component="ol" aria-label="Notes" data-testid="list-markers-nested">
                <ListItem marker="number">Nested lists count from one</ListItem>
                <ListItem marker="number">Each level keeps its own count</ListItem>
              </List>
            </ListItem>
          </List>
        </Paper>
      </Example>
    </Stack>
  );
}

export const listMarkersStory: Story = {
  id: 'list-markers',
  title: 'List markers',
  render: () => <ListMarkersStory />,
};
