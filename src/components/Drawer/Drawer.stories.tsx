import { useState } from 'react';
import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Stack } from '../Stack';
import { Typography } from '../Typography';
import { Button } from '../Button';
import { Divider } from '../Divider';
import { Drawer } from './Drawer';
import type { DrawerAnchor } from './Drawer.types';

const anchors: readonly DrawerAnchor[] = ['left', 'right', 'top', 'bottom'];
const links = ['Overview', 'Projects', 'Members', 'Billing'];

function Navigation({ onSelect }: { onSelect: () => void }) {
  return (
    <Stack component="nav" aria-label="Workspace" p="lg" spacing="sm">
      <Typography variant="title-sm">Workspace</Typography>
      <Divider />
      {links.map((link) => (
        <Button key={link} variant="text" onClick={onSelect} data-testid={`drawer-link-${link}`}>
          {link}
        </Button>
      ))}
    </Stack>
  );
}

export function DrawerStory() {
  const [anchor, setAnchor] = useState<DrawerAnchor | null>(null);
  const [persistent, setPersistent] = useState(true);
  return (
    <Stack spacing="xl">
      <Example title="Temporary drawers from every edge">
        <Stack direction="row" spacing="sm">
          {anchors.map((edge) => (
            <Button
              key={edge}
              variant="outlined"
              onClick={() => setAnchor(edge)}
              data-testid={`drawer-open-${edge}`}
            >
              {edge}
            </Button>
          ))}
        </Stack>
        <Drawer
          open={anchor !== null}
          anchor={anchor ?? 'left'}
          onClose={() => setAnchor(null)}
          aria-label="Workspace navigation"
          data-testid="drawer-temporary"
        >
          <Navigation onSelect={() => setAnchor(null)} />
        </Drawer>
      </Example>
      <Example title="Persistent and permanent drawers live in the layout">
        <Stack direction="row" spacing="sm">
          <Button
            variant="outlined"
            onClick={() => setPersistent((value) => !value)}
            data-testid="drawer-toggle"
          >
            Toggle persistent
          </Button>
        </Stack>
        <Stack direction="row" spacing="lg">
          <Drawer variant="persistent" open={persistent} data-testid="drawer-persistent">
            <Navigation onSelect={() => undefined} />
          </Drawer>
          <Drawer variant="permanent" anchor="right" data-testid="drawer-permanent">
            <Stack p="lg">
              <Typography variant="body-md">Always here</Typography>
            </Stack>
          </Drawer>
        </Stack>
      </Example>
    </Stack>
  );
}

export const drawerStory: Story = {
  id: 'drawer',
  title: 'Drawer',
  render: () => <DrawerStory />,
};
