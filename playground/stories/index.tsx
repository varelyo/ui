import { buttonStory } from '../../src/components/Button/Button.stories';
import { buttonBaseStory } from '../../src/components/ButtonBase/ButtonBase.stories';
import { circularProgressStory } from '../../src/components/CircularProgress/CircularProgress.stories';
import { collapseStory } from '../../src/components/Collapse/Collapse.stories';
import { dividerStory } from '../../src/components/Divider/Divider.stories';
import { iconButtonStory } from '../../src/components/IconButton/IconButton.stories';
import { checkboxStory } from '../../src/components/Checkbox/Checkbox.stories';
import { switchStory } from '../../src/components/Switch/Switch.stories';
import { tableStory } from '../../src/components/Table/Table.stories';
import { tableContainerStory } from '../../src/components/TableContainer/TableContainer.stories';
import { tableHeadStory } from '../../src/components/TableHead/TableHead.stories';
import { tableBodyStory } from '../../src/components/TableBody/TableBody.stories';
import { tableRowStory } from '../../src/components/TableRow/TableRow.stories';
import { tableCellStory } from '../../src/components/TableCell/TableCell.stories';
import { tableSortLabelStory } from '../../src/components/TableSortLabel/TableSortLabel.stories';
import { breadcrumbsStory } from '../../src/components/Breadcrumbs/Breadcrumbs.stories';
import { skeletonStory } from '../../src/components/Skeleton/Skeleton.stories';
import { cardStory } from '../../src/components/Card/Card.stories';
import { cardHeaderStory } from '../../src/components/CardHeader/CardHeader.stories';
import { cardContentStory } from '../../src/components/CardContent/CardContent.stories';
import { cardActionsStory } from '../../src/components/CardActions/CardActions.stories';
import { avatarColorStory, avatarStory } from '../../src/components/Avatar/Avatar.stories';
import { chipStory } from '../../src/components/Chip/Chip.stories';
import { sidebarColorStory, sidebarStory } from '../../src/components/Sidebar/Sidebar.stories';
import { sidebarHeaderStory } from '../../src/components/SidebarHeader/SidebarHeader.stories';
import { sidebarContentStory } from '../../src/components/SidebarContent/SidebarContent.stories';
import { sidebarFooterStory } from '../../src/components/SidebarFooter/SidebarFooter.stories';
import { sidebarItemStory } from '../../src/components/SidebarItem/SidebarItem.stories';
import { paperStory } from '../../src/components/Paper/Paper.stories';
import { backdropStory } from '../../src/components/Backdrop/Backdrop.stories';
import { modalStory } from '../../src/components/Modal/Modal.stories';
import { dialogStory } from '../../src/components/Dialog/Dialog.stories';
import { dialogTitleStory } from '../../src/components/DialogTitle/DialogTitle.stories';
import { dialogContentStory } from '../../src/components/DialogContent/DialogContent.stories';
import { dialogActionsStory } from '../../src/components/DialogActions/DialogActions.stories';
import { drawerStory } from '../../src/components/Drawer/Drawer.stories';
import { popperStory } from '../../src/components/Popper/Popper.stories';
import { portalStory } from '../../src/components/Portal/Portal.stories';
import { tooltipStory } from '../../src/components/Tooltip/Tooltip.stories';
import { popoverStory } from '../../src/components/Popover/Popover.stories';
import { menuStory } from '../../src/components/Menu/Menu.stories';
import { menuItemStory } from '../../src/components/MenuItem/MenuItem.stories';
import { selectStory } from '../../src/components/Select/Select.stories';
import { selectOptionStory } from '../../src/components/SelectOption/SelectOption.stories';
import { tabsColorStory, tabsStory } from '../../src/components/Tabs/Tabs.stories';
import { tabListStory } from '../../src/components/TabList/TabList.stories';
import { tabStory } from '../../src/components/Tab/Tab.stories';
import { tabPanelStory } from '../../src/components/TabPanel/TabPanel.stories';
import { snackbarStory } from '../../src/components/Snackbar/Snackbar.stories';
import { formControlStory } from '../../src/components/FormControl/FormControl.stories';
import { formHelperTextStory } from '../../src/components/FormHelperText/FormHelperText.stories';
import { inputAdornmentStory } from '../../src/components/InputAdornment/InputAdornment.stories';
import { inputBaseStory } from '../../src/components/InputBase/InputBase.stories';
import { inputLabelStory } from '../../src/components/InputLabel/InputLabel.stories';
import {
  textFieldFileStory,
  textFieldStory,
} from '../../src/components/TextField/TextField.stories';
import {
  dropzoneColorStory,
  dropzoneFormStory,
  dropzoneStory,
} from '../../src/components/Dropzone/Dropzone.stories';
import { boxMinHeightStory, boxStory } from '../../src/foundation/Box/Box.stories';
import { containerStory } from '../../src/foundation/Container/Container.stories';
import { gridStory } from '../../src/foundation/Grid/Grid.stories';
import { iconStory } from '../../src/foundation/Icon/Icon.stories';
import { stackStory } from '../../src/foundation/Stack/Stack.stories';
import {
  themeScopeDefaultsStory,
  themeScopeStory,
} from '../../src/foundation/ThemeScope/ThemeScope.stories';
import { typographyStory } from '../../src/foundation/Typography/Typography.stories';
import type { Story } from '../story';
import { ContractsStory } from './contracts';
import { EngineStory } from './engine';
import { LayoutStory } from './layout';
import { MatrixStory } from './matrix';
import { InteractionRegressionsStory } from './interaction-regressions';

export type { Story };

export const stories: readonly Story[] = [
  {
    id: 'interaction-regressions',
    title: 'Interaction regressions',
    render: () => <InteractionRegressionsStory />,
  },
  typographyStory,
  iconStory,
  { id: 'layout', title: 'Stack, Grid and Container', render: () => <LayoutStory /> },
  themeScopeStory,
  themeScopeDefaultsStory,
  buttonStory,
  iconButtonStory,
  textFieldStory,
  textFieldFileStory,
  dropzoneStory,
  dropzoneColorStory,
  dropzoneFormStory,
  circularProgressStory,
  dividerStory,
  tooltipStory,
  portalStory,
  popperStory,
  popoverStory,
  menuStory,
  menuItemStory,
  selectStory,
  selectOptionStory,
  tabsStory,
  tabsColorStory,
  tabListStory,
  tabStory,
  tabPanelStory,
  snackbarStory,
  paperStory,
  backdropStory,
  modalStory,
  dialogStory,
  dialogTitleStory,
  dialogContentStory,
  dialogActionsStory,
  drawerStory,
  collapseStory,
  sidebarStory,
  sidebarColorStory,
  sidebarHeaderStory,
  sidebarContentStory,
  sidebarFooterStory,
  sidebarItemStory,
  breadcrumbsStory,
  skeletonStory,
  cardStory,
  cardHeaderStory,
  cardContentStory,
  cardActionsStory,
  avatarStory,
  avatarColorStory,
  chipStory,
  checkboxStory,
  switchStory,
  tableStory,
  tableContainerStory,
  tableHeadStory,
  tableBodyStory,
  tableRowStory,
  tableCellStory,
  tableSortLabelStory,
  stackStory,
  gridStory,
  containerStory,
  boxStory,
  boxMinHeightStory,
  buttonBaseStory,
  formControlStory,
  inputLabelStory,
  inputBaseStory,
  inputAdornmentStory,
  formHelperTextStory,
  { id: 'engine', title: 'Theme engine', render: () => <EngineStory /> },
  { id: 'matrix', title: 'Responsive matrix', render: () => <MatrixStory /> },
  { id: 'contracts', title: 'Refs and attributes', render: () => <ContractsStory /> },
];
