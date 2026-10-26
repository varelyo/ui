import {
  Avatar,
  Button,
  Chip,
  Icon,
  IconButton,
  Select,
  SelectOption,
  Stack,
  TextField,
  Typography,
} from '../../src';

export const controlSizes = ['xs', 'sm', 'md', 'lg'] as const;

export function ControlSizesStory() {
  return (
    <Stack spacing="lg">
      {controlSizes.map((size) => (
        <Stack
          key={size}
          direction="row"
          spacing="sm"
          alignItems="center"
          data-testid={`control-row-${size}`}
        >
          <Typography variant="label-md">{size}</Typography>
          <Button variant="contained" size={size} data-control="button">
            Save
          </Button>
          <Button variant="outlined" size={size} startAddon={<Icon name="add" />}>
            Add
          </Button>
          <IconButton
            variant="outlined"
            size={size}
            aria-label="Settings"
            data-control="icon-button"
          >
            <Icon name="settings" />
          </IconButton>
          <TextField size={size} placeholder="Email" aria-label="Email" data-control="text-field" />
          <Select size={size} defaultValue="editor" aria-label="Role" data-control="select">
            <SelectOption value="editor">Editor</SelectOption>
            <SelectOption value="viewer">Viewer</SelectOption>
          </Select>
          <Chip size={size} label="Design" data-control="chip" />
          <Avatar size={size} data-control="avatar">
            MH
          </Avatar>
        </Stack>
      ))}
    </Stack>
  );
}

export function ControlAddonsStory() {
  return (
    <Stack spacing="lg">
      {controlSizes.map((size) => (
        <Stack
          key={size}
          direction="row"
          spacing="sm"
          alignItems="center"
          data-testid={`addon-row-${size}`}
        >
          <Typography variant="label-md">{size}</Typography>
          <Button variant="outlined" size={size} data-control="button-text">
            Save
          </Button>
          <Button
            variant="outlined"
            size={size}
            startAddon={<Icon name="add" />}
            data-control="button-start"
          >
            Add
          </Button>
          <Button
            variant="outlined"
            size={size}
            endAddon={<Icon name="chevron-down" />}
            data-control="button-end"
          >
            More
          </Button>
          <TextField
            size={size}
            placeholder="Search"
            aria-label="Search"
            startAddon={<Icon name="search" />}
            endAddon={(addon) => (
              <IconButton {...addon.iconButton} aria-label="Clear search">
                <Icon name="close" />
              </IconButton>
            )}
            data-control="text-field"
          />
          <Select
            size={size}
            defaultValue="editor"
            aria-label="Role"
            startAddon={<Icon name="user" />}
            data-control="select"
          >
            <SelectOption value="editor">Editor</SelectOption>
            <SelectOption value="viewer">Viewer</SelectOption>
          </Select>
          <Chip
            size={size}
            label="Mira Holt"
            startAddon={(addon) => (
              <Avatar {...addon.avatar} color="primary">
                MH
              </Avatar>
            )}
            onDelete={() => undefined}
            data-control="chip"
          />
        </Stack>
      ))}
    </Stack>
  );
}
