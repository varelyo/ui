import { useState } from 'react';
import {
  Button,
  Checkbox,
  Select,
  SelectOption,
  Stack,
  Switch,
  Tab,
  TabList,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from '../../src';

function IndependentTabs() {
  const [disabled, setDisabled] = useState(false);
  const [present, setPresent] = useState(true);
  return (
    <>
      <Button onClick={() => setDisabled((current) => !current)}>Toggle independent tab</Button>
      <Button onClick={() => setPresent((current) => !current)}>Toggle tab presence</Button>
      {present && <Tab value="alpha" label="Independent Alpha" disabled={disabled} />}
    </>
  );
}

function ControlledTooltip({ initiallyOpen }: { initiallyOpen: boolean }) {
  const [count, setCount] = useState(0);
  const [open, setOpen] = useState(initiallyOpen);
  return (
    <Stack spacing="sm">
      <Tooltip
        title={initiallyOpen ? 'Controlled hint' : 'Controlled opening hint'}
        open={open}
        onOpen={() => {
          setCount((current) => current + 1);
          if (count > 0) setOpen(true);
        }}
        onClose={() => {
          setCount((current) => current + 1);
          if (count > 0) setOpen(false);
        }}
      >
        <Button>
          {initiallyOpen ? 'Controlled tooltip trigger' : 'Controlled opening trigger'}
        </Button>
      </Tooltip>
      <Typography data-testid={initiallyOpen ? 'tooltip-close-count' : 'tooltip-open-count'}>
        {count}
      </Typography>
    </Stack>
  );
}

export function InteractionRegressionsStory() {
  const [render, setRender] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [cancelReset, setCancelReset] = useState(false);
  return (
    <Stack spacing="lg">
      <TextField label="Resize autosize" multiline minRows={1} maxRows={20} fullWidth />
      <form
        data-testid="reset-form"
        onReset={(event) => {
          if (cancelReset) event.preventDefault();
        }}
      >
        <Stack spacing="sm">
          <Checkbox label="Reset checkbox" name="checkbox" />
          <Switch label="Reset switch" name="switch" />
          <Checkbox label="Initially checked" defaultChecked name="initial" />
          <Checkbox label="Controlled checkbox" checked name="controlled" />
          <Switch label="Controlled switch" checked />
          <Select label="Reset select" name="select" defaultValue="alpha">
            <SelectOption value="alpha">Alpha</SelectOption>
            <SelectOption value="beta">Beta</SelectOption>
          </Select>
          <Select label="Reset multiple" name="multiple" multiple defaultValue={['alpha']}>
            <SelectOption value="alpha">Alpha</SelectOption>
            <SelectOption value="beta">Beta</SelectOption>
          </Select>
          <Button type="reset">Reset form</Button>
          <Button onClick={() => setCancelReset((current) => !current)}>
            Toggle reset cancellation
          </Button>
        </Stack>
      </form>
      <Button onClick={() => setRender((current) => current + 1)}>Rerender {render}</Button>
      <Select label="Cancelable select" defaultValue="alpha">
        <SelectOption value="alpha">Alpha</SelectOption>
        <SelectOption value="beta" onClick={(event) => event.preventDefault()}>
          Beta
        </SelectOption>
      </Select>
      <Select label="Dynamic select" defaultValue="alpha" disabled={disabled}>
        <SelectOption value="alpha">Alpha</SelectOption>
        <SelectOption value="beta">Beta</SelectOption>
      </Select>
      <Button data-testid="toggle-disabled" onClick={() => setDisabled((current) => !current)}>
        Toggle disabled
      </Button>
      <Typography id="external-select-label">External select label</Typography>
      <Select aria-labelledby="external-select-label" defaultValue="alpha">
        <SelectOption value="alpha">Alpha</SelectOption>
        <SelectOption value="beta">Beta</SelectOption>
      </Select>
      <Button data-testid="before-tabs">Before tabs</Button>
      <Tabs>
        <TabList aria-label="Initially unselected tabs">
          <Tab value="disabled" label="Disabled first" disabled />
          <Tab value="enabled" label="Enabled second" />
          <Tab value="last" label="Enabled last" />
        </TabList>
      </Tabs>
      <Tabs defaultValue="alpha" dir="rtl">
        <TabList aria-label="RTL tabs">
          <Tab value="alpha" label="RTL Alpha" disabled={disabled} />
          <Tab value="beta" label="RTL Beta" />
          <Tab value="gamma" label="RTL Gamma" />
        </TabList>
      </Tabs>
      <Tabs defaultValue="alpha">
        <TabList aria-label="Independent tabs">
          <IndependentTabs />
          <Tab value="beta" label="Independent Beta" />
        </TabList>
      </Tabs>
      <ControlledTooltip initiallyOpen />
      <ControlledTooltip initiallyOpen={false} />
    </Stack>
  );
}
