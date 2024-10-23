/* eslint-disable prettier/prettier */
import React from 'react';
// import CyberList from './CyberList'; // Assurez-vous que le chemin du composant est correct.
import AllCybers from '../AllCybers';

const CyberList = () => {
    // Génération de la liste de 20 cybers pour tester l'affichage
    const cybers = [
        {
            id: 1,
            name: 'CyberNet Oasis',
            address: '123 Tech Avenue, Silicon Valley',
            status: 'Open',
            rating: 4.5,
            image: 'https://via.placeholder.com/400x200.png?text=CyberNet+Oasis',
            printers: 10,
            services: ['Printing', 'Scanning', 'Web Access', 'Gaming']
        },
        {
            id: 2,
            name: 'Digital Hive',
            address: '456 Innovation Blvd, New York',
            status: 'Closed',
            rating: 4.0,
            image: 'https://via.placeholder.com/400x200.png?text=Digital+Hive',
            printers: 8,
            services: ['Printing', 'Scanning', 'Design Assistance']
        },
        {
            id: 3,
            name: 'TechZone Café',
            address: '789 Startup Lane, San Francisco',
            status: 'Open',
            rating: 4.8,
            image: 'https://via.placeholder.com/400x200.png?text=TechZone+Cafe',
            printers: 12,
            services: ['Printing', 'Web Access', 'Gaming', 'Video Conferencing']
        },
        {
            id: 4,
            name: 'ByteCity',
            address: '1010 Software Park, Boston',
            status: 'Closed',
            rating: 3.5,
            image: 'https://via.placeholder.com/400x200.png?text=ByteCity',
            printers: 5,
            services: ['Printing', 'Scanning']
        },
        {
            id: 5,
            name: 'Matrix Hub',
            address: '2020 IT Street, Austin',
            status: 'Open',
            latitude: -4.2354054,
            longitude: 15.2680095,
            rating: 4.3,
            image: 'https://via.placeholder.com/400x200.png?text=Matrix+Hub',
            printers: 7,
            services: ['Printing', 'Web Access', 'Video Conferencing'],
            testimonials: [
                    {
                        id: 1,
                        author: 'John Doe',
                        date: '2022-01-01',
                        comment: "J'ai adoré le service de prise en charge et l'accueil est très sympathique!",
                        rating: 4.5
                    },
                    {
                        id: 2,
                        author: 'Jane Smith',
                        date: '2022-01-15',
                        comment: "J'ai remarqué une impression exceptionnelle du service de prise en charge!",
                        rating: 5,
                    },
                    {
                        id: 3,
                        author: 'Michael Johnson',
                        date: '2022-02-05',
                        comment: "J'ai apprécié l'équipe et la disponibilité pour répondre à mes questions!",
                        rating: 4.8
                    },
                    {
                        id: 4,
                        author: 'Sarah Wilson',
                        date: '2022-02-20',
                        comment: "J'ai été satisfait du service de prise en charge et du rendez-vous avec l'équipe!",
                        rating: 4.2
                    }   
            ]
        },
        {
            id: 6,
            name: 'TechVerse Lounge',
             address: '3030 Cloud Drive, Seattle',
            status: 'Open',
            rating: 4.7,
            image: 'https://via.placeholder.com/400x200.png?text=TechVerse+Lounge',
            printers: 9,
            services: ['Printing', 'Web Access', 'Gaming', '3D Printing']
        },
        {
            id: 7,
            name: 'CyberWorld Station',
            address: '4040 Digital Way, Los Angeles',
            status: 'Closed',
            rating: 3.9,
            image: 'https://via.placeholder.com/400x200.png?text=CyberWorld+Station',
            printers: 4,
            services: ['Printing', 'Web Access']
        },
        {
            id: 8,
            name: 'InfiniTech Café',
            address: '5050 Infinite Loop, Chicago',
            status: 'Open',
            rating: 4.6,
            image: 'https://via.placeholder.com/400x200.png?text=InfiniTech+Cafe',
            printers: 11,
            services: ['Printing', 'Web Access', 'Gaming', 'Scanning']
        },
        {
            id: 9,
            name: 'DataStream Café',
            address: '6060 Data Drive, Miami',
            status: 'Open',
            rating: 4.9,
            image: 'https://via.placeholder.com/400x200.png?text=DataStream+Cafe',
            printers: 13,
            services: ['Printing', 'Web Access', 'Video Conferencing']
        },
        {
            id: 10,
            name: 'TechLab Hub',
            address: '7070 Silicon Road, Denver',
            status: 'Closed',
            rating: 3.7,
            image: 'https://via.placeholder.com/400x200.png?text=TechLab+Hub',
            printers: 6,
            services: ['Printing', 'Scanning', 'Web Access']
        },
        {
            id: 11,
            name: 'WebFusion Café',
            address: '8080 Network Ave, Dallas',
            status: 'Open',
            rating: 4.5,
            image: 'https://via.placeholder.com/400x200.png?text=WebFusion+Cafe',
            printers: 15,
            services: ['Printing', 'Web Access', 'Gaming', 'Video Conferencing']
        },
        {
            id: 12,
            name: 'CyberLink Lounge',
            address: '9090 Server St, Houston',
            status: 'Closed',
            rating: 4.2,
            image: 'https://via.placeholder.com/400x200.png?text=CyberLink+Lounge',
            printers: 7,
            services: ['Printing', 'Scanning', 'Web Access']
        },
        {
            id: 13,
            name: 'Digital Hub',
            address: '1111 Circuit Drive, Portland',
            status: 'Open',
            rating: 4.1,
            image: 'https://via.placeholder.com/400x200.png?text=Digital+Hub',
            printers: 9,
            services: ['Printing', 'Gaming', '3D Printing', 'Scanning']
        },
        {
            id: 14,
            name: 'BitStream Station',
            address: '2222 Binary Blvd, Philadelphia',
            status: 'Open',
            rating: 3.8,
            image: 'https://via.placeholder.com/400x200.png?text=BitStream+Station',
            printers: 4,
            services: ['Printing', 'Web Access']
        },
        {
            id: 15,
            name: 'ConnectNow Café',
            address: '3333 Fiber Lane, Atlanta',
            status: 'Open',
            rating: 4.9,
            image: 'https://via.placeholder.com/400x200.png?text=ConnectNow+Cafe',
            printers: 10,
            services: ['Printing', 'Gaming', 'Video Conferencing']
        },
        {
            id: 16,
            name: 'TechSavvy Lounge',
            address: '4444 Silicon Ave, Phoenix',
            status: 'Closed',
            rating: 4.0,
            image: 'https://via.placeholder.com/400x200.png?text=TechSavvy+Lounge',
            printers: 5,
            services: ['Printing', 'Scanning', 'Gaming']
        },
        {
            id: 17,
            name: 'NetZone Café',
            address: '5555 Cloud Blvd, San Diego',
            status: 'Open',
            rating: 4.6,
            image: 'https://via.placeholder.com/400x200.png?text=NetZone+Cafe',
            printers: 8,
            services: ['Printing', 'Web Access', 'Video Conferencing']
        },
        {
            id: 18,
            name: 'ByteStream Hub',
            address: '6666 Data Dr, Las Vegas',
            status: 'Closed',
            rating: 3.6,
            image: 'https://via.placeholder.com/400x200.png?text=ByteStream+Hub',
            printers: 3,
            services: ['Printing', 'Web Access']
        },
        {
            id: 19,
            name: 'TechSphere Station',
            address: '7777 Virtual Road, Orlando',
            status: 'Open',
            rating: 4.4,
            image: 'https://via.placeholder.com/400x200.png?text=TechSphere+Station',
            printers: 6,
            services: ['Printing', 'Scanning', 'Gaming']
        },
        {
            id: 20,
            name: 'DigitalSpace Lounge',
            address: '8888 Pixel Path, Tampa',
            status: 'Open',
            rating: 4.7,
            image: 'https://via.placeholder.com/400x200.png?text=DigitalSpace+Lounge',
            printers: 10,
            services: ['Printing', 'Web Access', '3D Printing', 'Scanning']
        }
    ];

    return (
        <>
            <h1>Tous les cybers</h1>
            <AllCybers cybers={cybers} />
        </>
    );
};

export default CyberList;
