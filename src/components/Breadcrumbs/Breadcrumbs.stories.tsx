import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Icon } from '../Icon';
import { Stack } from '../Stack';
import { Typography } from '../Typography';
import { Button } from '../Button';
import { Breadcrumbs } from './Breadcrumbs';

const path = ['Workspace', 'Projects', 'Harbor', 'Design', 'Components', 'Buttons'];

export function BreadcrumbsStory() {
  return (
    <Stack spacing="xl">
      <Example title="A labelled path whose last item is the current page">
        <Breadcrumbs data-testid="breadcrumbs">
          <Button variant="text" size="sm" href="#workspace">
            Workspace
          </Button>
          <Button variant="text" size="sm" href="#projects">
            Projects
          </Button>
          <Typography variant="body-sm" color="on-surface-default">
            Harbor
          </Typography>
        </Breadcrumbs>
      </Example>
      <Example title="Long paths collapse the middle behind a named button">
        <Breadcrumbs
          maxItems={4}
          itemsBeforeCollapse={1}
          itemsAfterCollapse={2}
          data-testid="breadcrumbs-long"
        >
          {path.map((name, index) =>
            index === path.length - 1 ? (
              <Typography key={name} variant="body-sm" color="on-surface-default">
                {name}
              </Typography>
            ) : (
              <Button key={name} variant="text" size="sm" href={`#${name.toLowerCase()}`}>
                {name}
              </Button>
            ),
          )}
        </Breadcrumbs>
      </Example>
      <Example title="A custom separator">
        <Breadcrumbs separator={<Icon name="chevron-right" size="xs" />}>
          <Button variant="text" size="sm" href="#settings">
            Settings
          </Button>
          <Typography variant="body-sm" color="on-surface-default">
            Billing
          </Typography>
        </Breadcrumbs>
      </Example>
    </Stack>
  );
}

export const breadcrumbsStory: Story = {
  id: 'breadcrumbs',
  title: 'Breadcrumbs',
  render: () => <BreadcrumbsStory />,
};
