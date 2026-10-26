import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Stack } from '../Stack';
import { ThemeScope } from '../ThemeScope';
import { Typography } from '../Typography';
import { Portal } from './Portal';

export function PortalStory() {
  return (
    <Stack spacing="xl">
      <Example title="Portalled content keeps the theme it was opened from">
        <ThemeScope brand="slate" mode="dark" data-testid="portal-source">
          <Stack p="md">
            <Typography variant="body-md">This scope is slate dark.</Typography>
            <Portal>
              <Typography variant="body-md" data-testid="portal-content">
                Rendered at the end of the document, still slate dark.
              </Typography>
            </Portal>
          </Stack>
        </ThemeScope>
      </Example>
      <Example title="Inline when the portal is disabled">
        <Stack data-testid="portal-inline-parent">
          <Portal disablePortal>
            <Typography variant="body-md" data-testid="portal-inline">
              Rendered in place.
            </Typography>
          </Portal>
        </Stack>
      </Example>
    </Stack>
  );
}

export const portalStory: Story = {
  id: 'portal',
  title: 'Portal',
  render: () => <PortalStory />,
};
