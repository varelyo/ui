import { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Button } from '../../components/Button';
import { Tooltip } from '../../components/Tooltip';
import { Icon } from '../Icon';
import { Stack } from '../Stack';
import { ThemeScope } from './ThemeScope';

export function ThemeScopeStory() {
  return (
    <Stack spacing="lg">
      <Example title="Nested scopes inherit the axis they do not set">
        <Stack spacing="md" p="lg" data-testid="outer">
          <Stack direction="row" spacing="sm">
            <Button variant="contained">Neutral light</Button>
            <Button variant="outlined">Outlined</Button>
          </Stack>
          <ThemeScope mode="dark" data-testid="dark-scope">
            <Stack spacing="md" p="lg">
              <Stack direction="row" spacing="sm">
                <Button variant="contained">Neutral dark</Button>
                <Button variant="outlined">Outlined</Button>
              </Stack>
              <ThemeScope brand="slate" data-testid="slate-scope">
                <Stack spacing="md" p="lg">
                  <Stack direction="row" spacing="sm" alignItems="center">
                    <Button variant="contained">Slate dark</Button>
                    <Button variant="outlined">Outlined</Button>
                    <Icon name="star" />
                  </Stack>
                  <ThemeScope mode="light" data-testid="light-scope">
                    <Stack direction="row" spacing="sm" p="lg" alignItems="center">
                      <Button variant="contained">Slate light</Button>
                      <Button variant="outlined">Outlined</Button>
                      <Icon name="star" />
                    </Stack>
                  </ThemeScope>
                </Stack>
              </ThemeScope>
            </Stack>
          </ThemeScope>
        </Stack>
      </Example>
      <Example title="An inverse scope takes the opposite mode of its parent">
        <ThemeScope mode="inverse" data-testid="inverse-scope">
          <Stack spacing="md" p="lg">
            <Stack direction="row" spacing="sm" alignItems="center">
              <Button variant="contained" data-testid="inverse-button">
                Inverse
              </Button>
              <Tooltip title="Opened inside" open placement="right" data-testid="inverse-tooltip">
                <Button variant="text">Text</Button>
              </Tooltip>
            </Stack>
            <ThemeScope mode="dark" data-testid="inverse-dark-scope">
              <Stack direction="row" spacing="sm" p="lg">
                <Button variant="contained" data-testid="inverse-dark-button">
                  Always dark
                </Button>
              </Stack>
            </ThemeScope>
          </Stack>
        </ThemeScope>
      </Example>
    </Stack>
  );
}

export const themeScopeStory: Story = {
  id: 'theme-scope',
  title: 'ThemeScope',
  render: () => <ThemeScopeStory />,
};

export function ThemeScopeDefaultsStory() {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!host.current) return undefined;
    const container = document.createElement('div');
    host.current.append(container);
    const root = createRoot(container);
    root.render(
      <ThemeScope data-testid="outermost-scope">
        <ThemeScope data-testid="nested-scope">Outside every other scope</ThemeScope>
        <ThemeScope mode="inverse" data-testid="outermost-inverse" />
      </ThemeScope>,
    );
    return () => {
      setTimeout(() => {
        root.unmount();
        container.remove();
      });
    };
  }, []);
  return <div ref={host} data-testid="detached-root" />;
}

export const themeScopeDefaultsStory: Story = {
  id: 'theme-scope-defaults',
  title: 'ThemeScope defaults',
  render: () => <ThemeScopeDefaultsStory />,
};
