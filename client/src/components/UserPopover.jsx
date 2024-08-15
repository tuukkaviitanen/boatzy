import { Box, IconButton, Input, Popover } from '@mui/material';
import { useContext } from 'react';
import { PopoverContext } from '../contexts/PopoverContext';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import { UserContext } from '../contexts/UserContext';

const styles = {
  container: {
    width: 200,
    height: 70,
    px: 2,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  renameContainer: {
    display: 'flex',
  },
};

const UserPopover = () => {
  const [{ userPopover }, { setUserPopover }] = useContext(PopoverContext);
  const [users, { setUserName, deleteUser }] = useContext(UserContext);
  const selectedUser = users[userPopover.userIndex];
  const isOpen = Boolean(userPopover.anchorElement);

  const handleOnClose = () => {
    setUserPopover(null, null);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const name = formData.get('name');

    setUserName(userPopover.userIndex, name);
    handleOnClose();
  };

  const handleDelete = () => {
    deleteUser(userPopover.userIndex);
    handleOnClose();
  };

  return (
    <Popover
      open={isOpen}
      anchorEl={userPopover.anchorElement}
      onClose={handleOnClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <Box sx={styles.container} data-testid="user-popover">
        <Box
          component="form"
          sx={styles.renameContainer}
          onSubmit={handleSubmit}
          autoCorrect="off"
          spellCheck="false"
          autoComplete="off"
        >
          <Input
            defaultValue={selectedUser?.name ?? ''}
            name="name"
            placeholder="Change name"
          />
          <IconButton type="submit" data-testid="submit-button">
            <CheckIcon />
          </IconButton>
          <IconButton
            type="button"
            onClick={handleDelete}
            disabled={users.length < 2}
            data-testid="delete-button"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
    </Popover>
  );
};

export default UserPopover;
