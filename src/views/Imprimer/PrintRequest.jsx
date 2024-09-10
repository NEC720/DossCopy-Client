import React, { useState } from 'react';
import { Button, Stepper, Step, StepLabel, Box, Typography } from '@mui/material';
import Step1 from './PrintSteps/Step1';
import Step2 from './PrintSteps/Step2';
import Step3 from './PrintSteps/Step3';

const steps = ["Choix du type d'impression", 'Choix du cyber', 'Récapitulatif'];

export default function PrintRequest() {
    const [activeStep, setActiveStep] = useState(0);
    const [formData, setFormData] = useState({
        typeImpression: '',
        characteristics: {},
        quantity: 1,
        selectedCyber: null
    });

    const handleNext = (data) => {
        setFormData({ ...formData, ...data });
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleSubmit = () => {
        // Logique pour lancer la demande d'impression
        console.log("Demande d'impression soumise :", formData);
    };

    return (
        <Box sx={{ width: '100%', mt: 4 }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box sx={{ mt: 4 }}>
                {activeStep === 0 && <Step1 onNext={handleNext} />}
                {activeStep === 1 && <Step2 onNext={handleNext} onBack={handleBack} />}
                {activeStep === 2 && <Step3 formData={formData} onBack={handleBack} onSubmit={handleSubmit} />}
            </Box>
        </Box>
    );
}
