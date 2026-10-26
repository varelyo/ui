import { useEffect, useRef } from 'react';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Divider,
  Grid,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
  LinearProgress,
  Link,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  TextField,
  ThemeScope,
  Typography,
} from '../../src';
import { Example } from './example';

declare global {
  interface Window {
    vyRefs?: Record<string, string | undefined>;
  }
}

export function ContractsStory() {
  const button = useRef<HTMLButtonElement>(null);
  const link = useRef<HTMLAnchorElement>(null);
  const iconButton = useRef<HTMLButtonElement>(null);
  const fieldRoot = useRef<HTMLDivElement>(null);
  const fieldInput = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const areaInput = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const stack = useRef<HTMLElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const icon = useRef<SVGSVGElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const scope = useRef<HTMLDivElement>(null);
  const divider = useRef<HTMLDivElement>(null);
  const paper = useRef<HTMLElement>(null);
  const box = useRef<HTMLElement>(null);
  const avatar = useRef<HTMLDivElement>(null);
  const sortLabel = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const listSubheader = useRef<HTMLLIElement>(null);
  const listItem = useRef<HTMLLIElement>(null);
  const listItemButton = useRef<HTMLButtonElement>(null);
  const listItemIcon = useRef<HTMLSpanElement>(null);
  const listItemText = useRef<HTMLDivElement>(null);
  const listItemAvatar = useRef<HTMLDivElement>(null);
  const textLink = useRef<HTMLAnchorElement>(null);
  const linearProgress = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    window.vyRefs = {
      button: button.current?.tagName,
      link: link.current?.tagName,
      iconButton: iconButton.current?.tagName,
      fieldRoot: fieldRoot.current?.tagName,
      fieldInput: fieldInput.current?.tagName,
      areaInput: areaInput.current?.tagName,
      stack: stack.current?.tagName,
      grid: grid.current?.tagName,
      container: container.current?.tagName,
      heading: heading.current?.tagName,
      icon: icon.current?.tagName,
      progress: progress.current?.tagName,
      scope: scope.current?.tagName,
      divider: divider.current?.tagName,
      paper: paper.current?.tagName,
      box: box.current?.tagName,
      avatar: avatar.current?.tagName,
      sortLabel: sortLabel.current?.tagName,
      list: list.current?.tagName,
      listSubheader: listSubheader.current?.tagName,
      listItem: listItem.current?.tagName,
      listItemButton: listItemButton.current?.tagName,
      listItemIcon: listItemIcon.current?.tagName,
      listItemText: listItemText.current?.tagName,
      listItemAvatar: listItemAvatar.current?.tagName,
      textLink: textLink.current?.tagName,
      linearProgress: linearProgress.current?.tagName,
    };
  }, []);
  return (
    <Stack spacing="xl">
      <Example title="Refs, native attributes and no leaking props">
        <ThemeScope ref={scope} mode="light" id="contract-scope" data-extra="scope">
          <Stack spacing="md">
            <Button
              ref={button}
              variant="contained"
              color="secondary"
              size="lg"
              fullWidth
              loadingPosition="end"
              startAddon={<Icon name="add" />}
              id="contract-button"
              title="Create"
              aria-describedby="contract-heading"
              data-extra="button"
              name="action"
              value="create"
            >
              Create
            </Button>
            <Button ref={link} href="#contract" variant="outlined" data-extra="link" target="_self">
              Link
            </Button>
            <IconButton
              ref={iconButton}
              variant="outlined"
              color="error"
              size="sm"
              loading={false}
              id="contract-icon-button"
              title="Remove"
              aria-label="Remove"
              aria-describedby="contract-heading"
              data-extra="icon-button"
              name="remove"
              value="row"
            >
              <Icon name="trash" />
            </IconButton>
            <TextField
              ref={fieldRoot}
              inputRef={fieldInput}
              label="Code"
              helperText="Five characters at most"
              maxLength={5}
              name="code"
              autoComplete="off"
              data-extra="field"
              aria-describedby="contract-heading"
              variant="filled"
              size="sm"
              fullWidth
            />
            <TextField inputRef={areaInput} label="Notes" multiline minRows={2} data-extra="area" />
            <Stack
              ref={stack}
              component="section"
              direction="row"
              spacing="sm"
              data-extra="stack"
              aria-label="Actions"
            >
              <Typography
                ref={heading}
                id="contract-heading"
                variant="title-md"
                data-extra="typography"
              >
                Heading
              </Typography>
              <Box
                ref={box}
                component="section"
                flexGrow={1}
                minHeight="auto"
                data-extra="box"
                aria-label="Details"
              />
              <Avatar
                ref={avatar}
                color="secondary"
                variant="rounded"
                size="sm"
                title="Mira Holt"
                data-extra="avatar"
              >
                MH
              </Avatar>
              <Icon ref={icon} name="star" size="lg" data-extra="icon" />
              <CircularProgress ref={progress} aria-label="Progress" data-extra="progress" />
              <LinearProgress
                ref={linearProgress}
                variant="determinate"
                value={140}
                color="secondary"
                size={{ xs: 'sm', lg: 'lg' }}
                aria-label="Clamped progress"
                title="Clamped"
                data-extra="linear-progress"
              />
              <Link
                ref={textLink}
                href="#contract-terms"
                underline="hover"
                color="primary"
                variant="body-sm"
                disabled={false}
                title="Terms"
                aria-describedby="contract-heading"
                data-extra="text-link"
              >
                Terms
              </Link>
              <Divider
                ref={divider}
                orientation="vertical"
                variant="middle"
                flexItem
                data-extra="divider"
              />
            </Stack>
            <Grid ref={grid} container columns={2} spacing="sm" data-extra="grid">
              <Grid size={1} offset={1} data-extra="grid-item" />
            </Grid>
            <Paper
              ref={paper}
              component="article"
              variant="outlined"
              elevation="md"
              square
              selected
              data-extra="paper"
              aria-label="Summary"
            />
            <Table size="sm" data-extra="table">
              <TableHead>
                <TableRow>
                  <TableCell sortDirection="asc" data-extra="sorted-cell">
                    <TableSortLabel
                      ref={sortLabel}
                      active
                      direction="asc"
                      title="Sort by name"
                      data-extra="sort-label"
                    >
                      Name
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell sortDirection="desc" data-extra="body-cell">
                    Ada Lovelace
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <List
              ref={list}
              size="sm"
              color="primary"
              nested={false}
              disablePadding
              subheader="Contract group"
              aria-label="Contract list"
              data-extra="list"
            >
              <ListSubheader
                ref={listSubheader}
                color="secondary"
                inset
                sticky
                disableGutters
                title="Label"
                data-extra="list-subheader"
              >
                Label
              </ListSubheader>
              <ListItem
                ref={listItem}
                end="3"
                divider
                disablePadding
                disableGutters
                alignItems="flex-start"
                title="Row"
                data-extra="list-item"
              >
                <ListItemButton
                  ref={listItemButton}
                  color="secondary"
                  size="md"
                  selected
                  divider
                  disableGutters
                  alignItems="center"
                  autoFocus={false}
                  id="contract-list-item-button"
                  title="Open"
                  name="open"
                  value="row"
                  aria-describedby="contract-heading"
                  data-extra="list-item-button"
                >
                  <ListItemIcon ref={listItemIcon} size="lg" data-extra="list-item-icon">
                    <Icon name="star" />
                  </ListItemIcon>
                  <ListItemText
                    ref={listItemText}
                    primary="Primary"
                    secondary="Secondary"
                    inset
                    noWrap
                    primaryVariant="body-md"
                    secondaryVariant="label-sm"
                    title="Text"
                    data-extra="list-item-text"
                  />
                </ListItemButton>
              </ListItem>
              <ListItem marker="bullet" data-extra="list-item-marker">
                <ListItemAvatar ref={listItemAvatar} title="Avatar" data-extra="list-item-avatar">
                  <Avatar size="sm">AK</Avatar>
                </ListItemAvatar>
              </ListItem>
            </List>
            <Container
              ref={container}
              maxWidth="sm"
              disableGutters
              data-extra="container"
              data-testid="no-gutters"
            />
          </Stack>
        </ThemeScope>
      </Example>
    </Stack>
  );
}
