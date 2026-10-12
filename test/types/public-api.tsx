import { createRef } from 'react';
import {
  Avatar,
  Box,
  Button,
  Chip,
  CircularProgress,
  Container,
  Dropzone,
  Grid,
  Icon,
  IconButton,
  Sidebar,
  SidebarItem,
  Stack,
  Tab,
  TabList,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tabs,
  TextField,
  ThemeScope,
  Typography,
  type AvatarColor,
  type DropzoneColor,
  type DropzoneDragVerdict,
  type FileRejection,
  type SidebarColor,
  type TabsColor,
  type TableSortDirection,
} from '../../src';

const reasonText = (rejections: FileRejection[]) =>
  rejections.map(({ file, reasons }) => `${file.name}: ${reasons.join(', ')}`).join('; ');
const dragText = (verdict: DropzoneDragVerdict | undefined) =>
  verdict === 'reject' ? 'Refused' : verdict === 'accept' ? 'Accepted' : 'Idle';

export const files = (
  <Stack>
    <TextField type="file" label="Invoice" accept="application/pdf" name="invoice" required />
    <Dropzone
      label="Drop notes"
      helperText="TXT, up to 1 KB"
      icon={<Icon name="file" />}
      accept=".txt"
      multiple
      capture="user"
      maxSize={1024}
      maxFiles={3}
      onFilesSelected={(dropped) => dropped.length}
      onFilesRejected={reasonText}
      onDragVerdictChange={dragText}
      size={{ xs: 'sm', lg: 'lg' }}
      error
      disabled={false}
      aria-label="Notes"
      ref={createRef<HTMLDivElement>()}
      inputRef={createRef<HTMLInputElement>()}
    />
    <Dropzone label="Scan a receipt" accept="image/*" capture="environment" />
    <Dropzone label="Take a photo" accept="image/*" capture />
  </Stack>
);

// @ts-expect-error capture takes the native attribute's values: user, environment or a boolean
export const unknownCapture = <Dropzone capture="front" />;
// @ts-expect-error the size limit is a number of bytes
export const textSize = <Dropzone maxSize="5 MB" />;
const unknownReasons = (list: FileRejection[]) =>
  // @ts-expect-error rejection reasons are type, size or count
  list[0]?.reasons.includes('large');
export const unknownReason = <Dropzone onFilesRejected={unknownReasons} />;
// @ts-expect-error a rejection lists its reasons instead of naming one
export const singleReason = <Dropzone onFilesRejected={(list) => list[0]?.reason} />;
// @ts-expect-error a drag verdict is accept or reject
export const unknownVerdict = <Dropzone onDragVerdictChange={(verdict) => verdict === 'drop'} />;
// @ts-expect-error dropzone sizes are t-shirt steps
export const numericDropzone = <Dropzone size={4} />;
const dropzoneColors: readonly DropzoneColor[] = [
  'neutral',
  'primary',
  'secondary',
  'warning',
  'info',
  'success',
];
export const coloredDropzones = dropzoneColors.map((color) => (
  <Dropzone key={color} label="Drop a contract" color={color} />
));
// @ts-expect-error the dropzone shows an error with the error prop, not an error colour
export const dropzoneErrorColor = <Dropzone color="error" />;
// @ts-expect-error the colour without an accent is neutral, not default
export const dropzoneDefault = <Dropzone color="default" />;
// @ts-expect-error the dropzone colour is not responsive
export const dropzoneToneByWidth = <Dropzone color={{ md: 'primary' }} />;
// @ts-expect-error raw styles are not part of the dropzone API
export const dropzoneStyle = <Dropzone style={{ padding: 4 }} />;

export const accepted = (
  <ThemeScope brand="slate" mode="dark">
    <Stack spacing="md" p={['md', 'none', 'none']} direction={{ xs: 'column', md: 'row' }} />
    <Stack
      spacing={{ xs: ['none', 'xs'], md: 'md' }}
      p={{ xs: ['md', 'none', 'none'], sm: 'lg' }}
    />
    <Stack p={['xs', 'sm', 'md', 'lg']} display={{ xs: 'none', md: 'flex' }} component="section" />
    <Grid container columns={{ xs: 2, md: 3 }} spacing="md">
      <Grid size={{ xs: 12, md: 6 }} offset={{ md: 2 }} />
    </Grid>
    <Container maxWidth={false} fixed disableGutters />
    <Container maxWidth={{ xs: 'sm', lg: 'xl' }} />
    <Stack direction="row">
      <Box flexGrow={1} component="section" aria-label="Member" />
      <Box flexGrow={{ xs: 0, md: 1 }} ref={createRef<HTMLDivElement>()} />
      <Box flexGrow={1} minHeight="viewport" />
      <Box minHeight={{ xs: 'auto', md: 'viewport' }} component="main" />
      <Box />
    </Stack>
    <Typography
      variant={{ xs: 'body-sm', md: 'body-md' }}
      color="on-surface-variant-default"
      component="h2"
    />
    <Button size={{ xs: 'sm', md: 'md' }} variant="contained" color="error" href="/pricing" />
    <Button component="a" href="/pricing" ref={createRef<HTMLAnchorElement>()} />
    <Button href="/pricing" target="_blank" rel="noreferrer" ref={createRef<HTMLAnchorElement>()} />
    <Button ref={createRef<HTMLButtonElement>()} type="submit" loading loadingPosition="end" />
    <IconButton aria-label="More actions" color="secondary" size={{ xs: 'sm', md: 'md' }}>
      <Icon name="more-horizontal" />
    </IconButton>
    <IconButton aria-labelledby="report-title" loading ref={createRef<HTMLButtonElement>()}>
      <Icon name="refresh" />
    </IconButton>
    <IconButton href="/settings" aria-label="Settings" ref={createRef<HTMLAnchorElement>()}>
      <Icon name="settings" />
    </IconButton>
    <IconButton component="a" href="/help" aria-label="Help" ref={createRef<HTMLAnchorElement>()}>
      <Icon name="help" />
    </IconButton>
    <IconButton aria-label="Open menu" aria-haspopup="menu" aria-expanded={false} type="submit">
      <Icon name="menu" />
    </IconButton>
    <IconButton aria-label="Edit" variant="contained" color="primary">
      <Icon name="edit" />
    </IconButton>
    <IconButton aria-label="Filter" variant="outlined" color="neutral" size="sm">
      <Icon name="filter" />
    </IconButton>
    <IconButton aria-label="Close" variant="text">
      <Icon name="close" />
    </IconButton>
    <Chip label="Invited" />
    <Chip label="Admin" color="neutral" variant="outlined" size={{ xs: 'sm', md: 'md' }} />
    <Table size="sm">
      <TableHead>
        <TableRow>
          <TableCell sortDirection="desc">
            <TableSortLabel
              active
              direction="desc"
              onClick={(event) => event.currentTarget.blur()}
              ref={createRef<HTMLButtonElement>()}
              aria-describedby="sort-hint"
            >
              Joined
            </TableSortLabel>
          </TableCell>
          <TableCell sortDirection={false}>
            <TableSortLabel>Name</TableSortLabel>
          </TableCell>
        </TableRow>
      </TableHead>
    </Table>
    <Icon
      name="search"
      size={{ xs: 'sm', md: 'md' }}
      color="primary-default"
      titleAccess="Search"
    />
    <TextField
      value={0}
      onChange={(event) => event.target.value}
      inputRef={createRef<HTMLInputElement>()}
    />
    <TextField multiline minRows={2} maxRows={6} size={{ xs: 'sm', md: 'lg' }} variant="filled" />
    <CircularProgress variant="determinate" value={40} size="xl" color="inherit" />
  </ThemeScope>
);

// @ts-expect-error numbers are not spacing steps
export const numericSpacing = <Stack spacing={2} />;
// @ts-expect-error padding arrays hold at most four steps
export const longPadding = <Stack p={['md', 'md', 'md', 'md', 'md']} />;
// @ts-expect-error spacing takes one step or [row, column]
export const tripleSpacing = <Stack spacing={['md', 'md', 'md']} />;
// @ts-expect-error raw styles are not part of the public API
export const rawStyle = <Stack style={{ padding: 4 }} />;
// @ts-expect-error margin props do not exist
export const margin = <Stack m="md" />;
// @ts-expect-error per-side padding props are not added
export const sidePadding = <Stack px="md" />;
// @ts-expect-error sx does not exist
export const systemProps = <Button sx={{ padding: 1 }} />;
// @ts-expect-error the visual variant is not responsive
export const responsiveVariant = <Button variant={{ xs: 'text', md: 'contained' }} />;
// @ts-expect-error the colour intent is not responsive
export const responsiveColor = <Button color={{ xs: 'primary' }} />;
// @ts-expect-error intents come from the token vocabulary
export const unknownIntent = <Button color="danger" />;
// @ts-expect-error sizes are t-shirt steps
export const numericSize = <Button size={2} />;
// @ts-expect-error icon names come from the kit's own registry
export const unknownIcon = <Icon name="rocket" />;
// @ts-expect-error column spans count one to twelve
export const wideSpan = <Grid size={13} />;
// @ts-expect-error typography variants are composites
export const elementVariant = <Typography variant="h1" />;
// @ts-expect-error container widths are breakpoint keys
export const rawWidth = <Container maxWidth="1200px" />;
// @ts-expect-error refs keep the rendered element type
export const wrongRef = <Button ref={createRef<HTMLDivElement>()} />;
// @ts-expect-error display modes are limited per component
export const gridDisplay = <Stack display="grid" />;
// @ts-expect-error palette primitives are not text colours
export const paletteColor = <Typography color="blue-600" />;
// @ts-expect-error a link button refers to an anchor, not a button
export const linkRef = <Button href="/pricing" ref={createRef<HTMLButtonElement>()} />;

const icon = <Icon name="close" />;
const buttonRef = createRef<HTMLButtonElement>();
const divRef = createRef<HTMLDivElement>();
// @ts-expect-error an icon button is named by aria-label or aria-labelledby
export const unnamed = <IconButton>{icon}</IconButton>;
// @ts-expect-error the icon is a required child
export const noIcon = <IconButton aria-label="Close" />;
export const neutral = (
  // @ts-expect-error the colour without an accent is neutral, not default
  <IconButton aria-label="Close" color="default">
    {icon}
  </IconButton>
);
export const small = (
  // @ts-expect-error icon button sizes are t-shirt steps
  <IconButton aria-label="Close" size="small">
    {icon}
  </IconButton>
);
export const toneByWidth = (
  // @ts-expect-error the icon button colour is not responsive
  <IconButton aria-label="Close" color={{ xs: 'error' }}>
    {icon}
  </IconButton>
);
export const filled = (
  // @ts-expect-error icon button variants are Button's contained, outlined and text
  <IconButton aria-label="Add" variant="filled">
    {icon}
  </IconButton>
);
export const tonal = (
  // @ts-expect-error a tonal icon button is not a kit variant
  <IconButton aria-label="Add" variant="tonal">
    {icon}
  </IconButton>
);
export const variantByWidth = (
  // @ts-expect-error the icon button variant is not responsive
  <IconButton aria-label="Add" variant={{ xs: 'text', md: 'contained' }}>
    {icon}
  </IconButton>
);
export const edge = (
  // @ts-expect-error there is no edge prop, because the kit has no margins
  <IconButton aria-label="Close" edge="end">
    {icon}
  </IconButton>
);
export const styled = (
  // @ts-expect-error raw styles are not part of the icon button API
  <IconButton aria-label="Close" style={{ padding: 4 }}>
    {icon}
  </IconButton>
);
export const iconDivRef = (
  // @ts-expect-error icon button refs keep the rendered element type
  <IconButton aria-label="Close" ref={divRef}>
    {icon}
  </IconButton>
);
export const iconLinkRef = (
  // @ts-expect-error a link icon button refers to an anchor, not a button
  <IconButton href="/" aria-label="Home" ref={buttonRef}>
    {icon}
  </IconButton>
);

// @ts-expect-error the chip colour without an accent is neutral, not default
export const chipDefault = <Chip label="Draft" color="default" />;
// @ts-expect-error the chip colour is not responsive
export const chipToneByWidth = <Chip label="Draft" color={{ xs: 'neutral' }} />;

// @ts-expect-error flexGrow takes 0 or 1, not a proportion
export const growTwice = <Box flexGrow={2} />;
// @ts-expect-error flexGrow is a factor, not a keyword
export const growKeyword = <Box flexGrow="grow" />;
// @ts-expect-error sx does not exist on Box
export const boxSx = <Box sx={{ flexGrow: 1 }} />;
// @ts-expect-error raw styles are not part of the Box API
export const boxStyle = <Box style={{ flexGrow: 1 }} />;
// @ts-expect-error margin props do not exist on Box
export const boxMargin = <Box m="md" />;
// @ts-expect-error Box refs keep the rendered element type
export const boxRef = <Box ref={buttonRef} />;
// @ts-expect-error Grid spans count columns; a child that grows is a Box with flexGrow
export const gridGrow = <Grid size="grow" />;
// @ts-expect-error minHeight takes keywords, not a length
export const minHeightLength = <Box minHeight="100vh" />;
// @ts-expect-error minHeight takes keywords, not a fraction of the parent
export const minHeightFraction = <Box minHeight={1} />;
// @ts-expect-error minHeight has no keyword that fills the parent
export const minHeightStretch = <Box minHeight="stretch" />;
// @ts-expect-error minHeight takes keywords, not a percentage
export const minHeightPercent = <Box minHeight="100%" />;

const ascending: TableSortDirection = 'asc';
// @ts-expect-error sort directions are asc and desc
export const ariaDirection = <TableCell sortDirection="ascending" />;
// @ts-expect-error a sort label always has a direction; only the cell takes false
export const labelWithoutDirection = <TableSortLabel direction={false} />;
// @ts-expect-error the sort label is a native button
export const labelDivRef = <TableSortLabel direction={ascending} ref={divRef} />;
// @ts-expect-error raw styles are not part of the sort label API
export const labelStyle = <TableSortLabel style={{ padding: 4 }} />;

const sidebarColors: readonly SidebarColor[] = ['neutral', 'primary', 'secondary'];
export const sidebars = sidebarColors.map((color) => (
  <Sidebar key={color} label="Workspace" color={color} variant="docked">
    <SidebarItem selected>Projects</SidebarItem>
  </Sidebar>
));
export const neutralSidebar = <Sidebar label="Workspace" />;
// @ts-expect-error the colour without an accent is neutral, not default
export const sidebarDefault = <Sidebar label="Workspace" color="default" />;
// @ts-expect-error a navigation takes neutral, primary or secondary, not a status intent
export const sidebarStatus = <Sidebar label="Workspace" color="error" />;
// @ts-expect-error the sidebar colour is not responsive
export const sidebarToneByWidth = <Sidebar label="Workspace" color={{ md: 'primary' }} />;

const tabsColors: readonly TabsColor[] = ['neutral', 'primary', 'secondary'];
export const coloredTabs = tabsColors.map((color) => (
  <Tabs key={color} defaultValue="general" color={color}>
    <TabList aria-label="Settings">
      <Tab value="general" label="General" />
    </TabList>
  </Tabs>
));
export const neutralTabs = <Tabs defaultValue="general" />;
// @ts-expect-error Tabs take one color, not a textColor
export const tabsTextColor = <Tabs textColor="secondary" />;
// @ts-expect-error Tabs take one color, not an indicatorColor
export const tabsIndicatorColor = <Tabs indicatorColor="secondary" />;
// @ts-expect-error a navigation takes neutral, primary or secondary, not a status intent
export const tabsStatus = <Tabs color="success" />;
// @ts-expect-error the tabs colour is not responsive
export const tabsToneByWidth = <Tabs color={{ md: 'secondary' }} />;
// @ts-expect-error a tab takes its colour from Tabs
export const tabColor = <Tab value="general" color="primary" />;

const avatarColors: readonly AvatarColor[] = [
  'neutral',
  'primary',
  'secondary',
  'error',
  'warning',
  'info',
  'success',
];
export const avatars = avatarColors.map((color) => (
  <Avatar key={color} color={color} variant="rounded" size={{ xs: 'sm', md: 'md' }}>
    MH
  </Avatar>
));
export const neutralAvatar = <Avatar alt="Mira Holt" ref={createRef<HTMLDivElement>()} />;
// @ts-expect-error the colour without an accent is neutral, not default
export const avatarDefault = <Avatar color="default" />;
// @ts-expect-error the avatar colour is not responsive
export const avatarToneByWidth = <Avatar color={{ md: 'primary' }} />;
// @ts-expect-error avatar colours are intents, not raw colours
export const avatarRaw = <Avatar color="#355a8c" />;
