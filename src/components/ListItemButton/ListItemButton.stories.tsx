import { useState } from 'react';
import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Icon } from '../Icon';
import { Stack } from '../Stack';
import { Typography } from '../Typography';
import { List } from '../List';
import { ListItem } from '../ListItem';
import { ListItemIcon } from '../ListItemIcon';
import { ListItemText } from '../ListItemText';
import { Paper } from '../Paper';
import { ListItemButton } from './ListItemButton';

export function ListItemButtonStory() {
  const [presses, setPresses] = useState(0);
  const press = () => setPresses((value) => value + 1);
  return (
    <Example title="ListItemButton: rest, selected, disabled, a link and a custom element">
      <Stack spacing="sm">
        <Typography variant="body-sm" data-testid="list-item-button-presses">
          {`Presses: ${presses}`}
        </Typography>
        <Stack direction="row">
          <Paper variant="outlined">
            <List aria-label="Buttons">
              <ListItem>
                <ListItemButton onClick={press} data-testid="list-item-button-rest">
                  <ListItemIcon>
                    <Icon name="home" />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  selected
                  color="secondary"
                  onClick={press}
                  data-testid="list-item-button-selected"
                >
                  <ListItemIcon>
                    <Icon name="folder" />
                  </ListItemIcon>
                  <ListItemText primary="Projects" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton disabled onClick={press} data-testid="list-item-button-disabled">
                  <ListItemIcon>
                    <Icon name="lock" />
                  </ListItemIcon>
                  <ListItemText primary="Archive" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton href="#docs" data-testid="list-item-button-link">
                  <ListItemIcon>
                    <Icon name="external-link" />
                  </ListItemIcon>
                  <ListItemText primary="Documentation" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  component="div"
                  onClick={press}
                  data-testid="list-item-button-custom"
                >
                  <ListItemText primary="A custom element" />
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  component="div"
                  disabled
                  onClick={press}
                  data-testid="list-item-button-custom-disabled"
                >
                  <ListItemText primary="A disabled custom element" />
                </ListItemButton>
              </ListItem>
            </List>
          </Paper>
        </Stack>
      </Stack>
    </Example>
  );
}

export const listItemButtonStory: Story = {
  id: 'list-item-button',
  title: 'ListItemButton',
  render: () => <ListItemButtonStory />,
};
