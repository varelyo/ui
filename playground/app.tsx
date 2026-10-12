import type { Brand, Mode } from '../src';
import { Button, Container, Stack, ThemeScope, Typography } from '../src';
import { stories } from './stories';

const brands: readonly Brand[] = ['neutral', 'slate'];
const modes: readonly Mode[] = ['light', 'dark'];

const pick = <T extends string>(value: string | null, allowed: readonly T[], fallback: T): T =>
  allowed.find((item) => item === value) ?? fallback;

export function App() {
  const params = new URLSearchParams(window.location.search);
  const story = stories.find((item) => item.id === params.get('story'));
  const brand = pick(params.get('brand'), brands, 'neutral');
  const mode = pick(params.get('mode'), modes, 'light');
  if (!story)
    return (
      <ThemeScope brand={brand} mode={mode} component="main">
        <Container maxWidth="md">
          <Stack spacing="lg" p={['2xl', 'none']}>
            <Typography variant="headline-md">Varelyo Foundation stories</Typography>
            <Stack spacing="xs">
              {stories.map((item) => (
                <Stack key={item.id} direction="row" spacing="sm" alignItems="center">
                  <Button href={`?story=${item.id}`} variant="text">
                    {item.title}
                  </Button>
                  {brands.flatMap((itemBrand) =>
                    modes.map((itemMode) => (
                      <Button
                        key={`${itemBrand}-${itemMode}`}
                        href={`?story=${item.id}&brand=${itemBrand}&mode=${itemMode}`}
                        variant="text"
                        color="secondary"
                        size="sm"
                      >
                        {`${itemBrand} ${itemMode}`}
                      </Button>
                    )),
                  )}
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Container>
      </ThemeScope>
    );
  return (
    <ThemeScope brand={brand} mode={mode} component="main" data-story={story.id}>
      <Container maxWidth="xl">
        <Stack spacing="xl" p={['xl', 'none']}>
          <Typography variant="title-lg">{`${story.title} · ${brand} ${mode}`}</Typography>
          {story.render()}
        </Stack>
      </Container>
    </ThemeScope>
  );
}
