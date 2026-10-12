import { Profiler } from 'react';
import { Button, Icon, Stack, ThemeScope, Typography } from '../../src';
import { Example } from './example';

declare global {
  interface Window {
    vyRenderCount?: number;
  }
}

const count = () => {
  window.vyRenderCount = (window.vyRenderCount ?? 0) + 1;
};

export function EngineStory() {
  return (
    <Profiler id="engine" onRender={count}>
      <Stack spacing="xl">
        <Example title="Brand and mode switch through attributes without a React render">
          <ThemeScope brand="neutral" mode="light" data-testid="switchable">
            <Stack direction="row" spacing="sm" p="lg" alignItems="center">
              <Button variant="contained" data-testid="switch-button">
                Primary action
              </Button>
              <Typography data-testid="switch-text">Body text</Typography>
              <Icon name="star" data-testid="switch-icon" />
              <Stack display={{ xs: 'none', md: 'flex' }} data-testid="responsive-display">
                <Typography variant={{ xs: 'body-sm', md: 'title-md' }}>Visible from md</Typography>
              </Stack>
            </Stack>
          </ThemeScope>
        </Example>
        <Example title="Negative fixture: utilities written in a page generate no CSS">
          <div
            className="p-4 bg-slate-500 w-64 text-red-500 rounded-full shadow-lg"
            data-testid="forbidden"
          >
            Page-authored utilities
          </div>
        </Example>
      </Stack>
    </Profiler>
  );
}
