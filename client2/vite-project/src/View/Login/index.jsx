import React from 'react'
import { Box, Button, TextField, Typography, useMediaQuery } from '@mui/material';

export default function Login() {
    const isSmallScreen = useMediaQuery('(max-width:600px)');
  
    return (
        <Box
        bgcolor={'#173149'}
        height={{ md: '89vh', xs: "100vh" }}
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        flexDirection={'column'}
        p={isSmallScreen ? 2 : 4}

    >
        <Typography color='white' variant={isSmallScreen ? 'h5' : 'h4'}>
            قسم العلاقات العامه
        </Typography>

        <Box
            bgcolor={'white'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            flexDirection={'column'}
            p={isSmallScreen ? 3 : 4}
            borderRadius={2}
            boxShadow={3}
            maxWidth={'400px'}
            width={'90%'}
            minWidth={'280px'}
        >
            <Typography variant={isSmallScreen ? 'h6' : 'h5'}>
                تسجيل الدخول
            </Typography>

            <Box display={'flex'} flexDirection={'column'} width={'100%'} py={2}>
                <Box>
                    <label>البريد الالكتروني</label>
                    <TextField
                        sx={{ mt: 1 }}
                        size='small'
                        fullWidth
                        placeholder='ادخل البريد الالكتروني'
                    />
                </Box>

                <Box sx={{ my: 2 }}>
                    <label>كلمه السر</label>
                    <TextField
                        sx={{ mt: 1 }}
                        fullWidth
                        size='small'
                        placeholder='ادخل كلمه السر'
                        type="password"
                    />
                </Box>

                <Button
                    sx={{
                        background: "#007C89",
                        color: "white",
                        width: isSmallScreen ? "100%" : "120px",
                        borderRadius: "20px",
                        mt: 1
                    }}
                >
                    تسجيل الدخول
                </Button>
            </Box>
        </Box>
    </Box>
  )
}
