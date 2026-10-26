import { useState } from 'react';
import { Example } from '../../../playground/stories/example';
import type { Story } from '../../../playground/story';
import { Grid } from '../Grid';
import { Icon } from '../Icon';
import { Stack } from '../Stack';
import { Typography } from '../Typography';
import { Button } from '../Button';
import { Switch } from '../Switch';
import { TextField } from '../TextField';
import { Dropzone } from './Dropzone';
import type {
  DropzoneColor,
  DropzoneDragVerdict,
  DropzoneSize,
  FileRejection,
} from './Dropzone.types';

const sizes: readonly DropzoneSize[] = ['sm', 'md', 'lg'];
const colors: readonly DropzoneColor[] = [
  'neutral',
  'primary',
  'secondary',
  'warning',
  'info',
  'success',
];
const names = (files: readonly File[]) => files.map((file) => file.name).join(', ');
const refusals = (rejections: readonly FileRejection[]) =>
  rejections.map(({ file, reasons }) => `${file.name} (${reasons.join(' and ')})`).join(', ');

function DragFeedbackDropzone({ testId }: { testId: string }) {
  const [verdict, setVerdict] = useState<DropzoneDragVerdict | undefined>(undefined);
  return (
    <Dropzone
      icon={<Icon name="image" />}
      label={verdict === 'accept' ? 'Release to add the image' : 'Drop a cover image or browse'}
      helperText={verdict === 'reject' ? 'Only PNG images can be added' : 'PNG only'}
      accept="image/png"
      onDragVerdictChange={setVerdict}
      data-testid={testId}
    />
  );
}

export function DropzoneStory() {
  const [selected, setSelected] = useState('Nothing selected');
  const [rejected, setRejected] = useState('Nothing rejected');
  return (
    <Stack spacing="xl">
      <Example title="Sizes">
        <Grid container columns={{ xs: 1, md: 3 }} spacing="lg">
          {sizes.map((size) => (
            <Dropzone
              key={size}
              size={size}
              icon={<Icon name="upload" />}
              label="Drop files here or browse"
              helperText={`Size ${size}, any file type`}
            />
          ))}
        </Grid>
      </Example>
      <Example title="Hint, error and disabled">
        <Grid container columns={{ xs: 1, md: 3 }} spacing="lg">
          <Dropzone
            icon={<Icon name="image" />}
            label="Drop a cover image or browse"
            helperText="PNG or JPG, up to 5 MB"
            accept="image/png,image/jpeg"
            maxSize={5_242_880}
            data-testid="dropzone-cover"
          />
          <Dropzone
            icon={<Icon name="image" />}
            label="Drop a cover image or browse"
            helperText="banner.gif is not a PNG or JPG"
            accept="image/png,image/jpeg"
            error
            data-testid="dropzone-error"
          />
          <Dropzone
            icon={<Icon name="image" />}
            label="Uploads are closed"
            helperText="Ask an owner to reopen them"
            disabled
            onFilesSelected={() => setSelected('Disabled dropzone selected files')}
            data-testid="dropzone-disabled"
          />
        </Grid>
      </Example>
      <Example title="Files dragged over it: accepted and refused">
        <Grid container columns={{ xs: 1, md: 2 }} spacing="lg">
          <DragFeedbackDropzone testId="dropzone-drag-accept" />
          <DragFeedbackDropzone testId="dropzone-drag-reject" />
        </Grid>
      </Example>
      <Example title="Type, size and count limits with callbacks">
        <Stack spacing="sm" alignItems="flex-start">
          <Dropzone
            icon={<Icon name="file" />}
            label="Drop up to two notes or browse"
            helperText="TXT files, up to 1 KB each"
            accept=".txt,text/plain"
            multiple
            maxFiles={2}
            maxSize={1024}
            onFilesSelected={(files) => setSelected(`Selected: ${names(files)}`)}
            onFilesRejected={(rejections) => setRejected(`Rejected: ${refusals(rejections)}`)}
            data-testid="dropzone-notes"
          />
          <Typography variant="body-sm" data-testid="dropzone-selected">
            {selected}
          </Typography>
          <Typography variant="body-sm" data-testid="dropzone-rejected">
            {rejected}
          </Typography>
          <Button variant="outlined" data-testid="dropzone-next">
            Continue
          </Button>
        </Stack>
      </Example>
    </Stack>
  );
}

export const dropzoneStory: Story = {
  id: 'dropzone',
  title: 'Dropzone',
  render: () => <DropzoneStory />,
};

export function DropzoneFormStory() {
  const [photo, setPhoto] = useState('No photo');
  const [uploads, setUploads] = useState(true);
  return (
    <Stack spacing="xl">
      <Example title="A profile photo that phones can take with the front camera">
        <Stack spacing="sm">
          <Switch
            label="Photo uploads"
            checked={uploads}
            onChange={(_event, checked) => setUploads(checked)}
            data-testid="dropzone-uploads"
          />
          {uploads ? (
            <Dropzone
              icon={<Icon name="image" />}
              label="Drop a profile photo or browse"
              helperText="An image, up to 5 MB"
              accept="image/*"
              capture="user"
              maxSize={5_242_880}
              onFilesSelected={(files) => setPhoto(`Photo: ${names(files)}`)}
              data-testid="dropzone-photo"
            />
          ) : null}
          <Typography variant="body-sm" data-testid="dropzone-photo-chosen">
            {photo}
          </Typography>
        </Stack>
      </Example>
      <Example title="A file field on the same page">
        <TextField
          type="file"
          label="Signed contract"
          helperText="PDF, up to 10 MB"
          accept="application/pdf"
          name="contract"
          data-testid="dropzone-contract"
          fullWidth
        />
      </Example>
    </Stack>
  );
}

export const dropzoneFormStory: Story = {
  id: 'dropzone-form',
  title: 'Dropzone on a form',
  render: () => <DropzoneFormStory />,
};

export function DropzoneColorStory() {
  return (
    <Stack spacing="xl">
      <Example title="Colours at rest: neutral by default and the intents on the edge and the icon">
        <Grid container columns={{ xs: 1, md: 3 }} spacing="lg">
          {colors.map((color) => (
            <Dropzone
              key={color}
              size="sm"
              color={color}
              icon={<Icon name="upload" />}
              label="Drop a cover image or browse"
              helperText={`PNG only, ${color}`}
              accept="image/png"
              data-testid={`dropzone-${color}`}
            />
          ))}
        </Grid>
      </Example>
      <Example title="Colours with accepted files dragged over them">
        <Grid container columns={{ xs: 1, md: 3 }} spacing="lg">
          {colors.map((color) => (
            <Dropzone
              key={color}
              size="sm"
              color={color}
              icon={<Icon name="upload" />}
              label="Release to add the image"
              helperText={`PNG only, ${color}`}
              accept="image/png"
              data-testid={`dropzone-${color}-drag`}
            />
          ))}
        </Grid>
      </Example>
    </Stack>
  );
}

export const dropzoneColorStory: Story = {
  id: 'dropzone-color',
  title: 'Dropzone colours',
  render: () => <DropzoneColorStory />,
};
