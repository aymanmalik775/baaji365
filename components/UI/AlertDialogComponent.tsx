import react, { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button
} from '@chakra-ui/react';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  onAgree: () => void;
  onReject?: () => void;
};

const AlertDialogComponent = ({
  isOpen,
  onClose,
  title,
  description,
  onAgree,
  onReject
}: Props) => {
  const cancelRef = useRef(null);

  return (
    <>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              {title}
            </AlertDialogHeader>

            <AlertDialogBody>
              {description
                ? description
                : "Are you sure? You can't undo this action afterwards."}
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => {
                  onClose();
                  onReject && onReject();
                }}
              >
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onAgree} ml={3}>
                {"I'm sure"}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default AlertDialogComponent;
