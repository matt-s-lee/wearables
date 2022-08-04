import { Snackbar } from "@mui/material";
import { IoIosClose } from "react-icons/io";
import styled from "styled-components";


// for Snackbar

const SnackbarComponent = ({ message, snackbarOpen, setSnackbarOpen }) => {
    // CLOSE snackbar
    const handleCloseSnackbar = (ev, reason) => {
        setSnackbarOpen(false);
    };
    const action = (
        <>
            <Button onClick={handleCloseSnackbar}>
                <IoIosClose fontSize="20px" color="white" />
            </Button>
        </>
    );

    return (
        <>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={2500}
                message={message}
                onClose={handleCloseSnackbar}
                action={action}
            />
        </>
    )
};

// Snackbar
const Button = styled.button`
background: none;
border: none;
`;

export default SnackbarComponent;