// import React, { useEffect } from 'react';
// import PropTypes from 'prop-types';
// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
// import CheckIcon from '@mui/icons-material/Check';
// import IconButton from '@mui/material/IconButton';
// import { RichTreeView } from '@mui/x-tree-view/RichTreeView';
// import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
// import { TreeItem2, TreeItem2Label } from '@mui/x-tree-view/TreeItem2';
// // import { useTreeItem2 } from '@mui/x-tree-view/useTreeItem2';
// import { useTreeItem2Utils } from '@mui/x-tree-view/hooks';

// // Exemple de données pour les fichiers et répertoires
// const ITEMS = [
//     {
//         id: '1',
//         name: 'Documents',
//         editable: true,
//         children: [
//             { id: '2', name: 'Rapports', editable: true },
//             { id: '3', name: 'Factures', editable: true },
//             { id: '4', name: 'CV', editable: true }
//         ]
//     },
//     {
//         id: '5',
//         name: 'Images',
//         editable: true,
//         children: [
//             { id: '6', name: 'Vacances', editable: true },
//             { id: '7', name: 'Famille', editable: true }
//         ]
//     },
//     {
//         id: '8',
//         name: 'Musiques',
//         editable: true,
//         children: []
//     },
//     {
//         id: '9',
//         name: 'Vidéos',
//         editable: true,
//         children: [
//             { id: '10', name: 'Films', editable: true },
//             { id: '11', name: 'Séries', editable: true }
//         ]
//     },
//     {
//         id: '12',
//         name: 'Ajouts récents',
//         editable: true,
//         children: []
//     }
// ];

// // Styled input pour l'édition des étiquettes
// const StyledLabelInput = styled('input')(({ theme }) => ({
//     ...theme.typography.body1,
//     backgroundColor: theme.palette.background.paper,
//     borderRadius: theme.shape.borderRadius,
//     border: 'none',
//     padding: '0 2px',
//     boxSizing: 'border-box',
//     width: 100,
//     '&:focus': {
//         outline: `1px solid ${theme.palette.primary.main}`
//     }
// }));

// function Label({ children, ...other }) {
//     return (
//         <TreeItem2Label
//             {...other}
//             sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: 2,
//                 justifyContent: 'space-between',
//                 minHeight: 30
//             }}
//         >
//             {children}
//         </TreeItem2Label>
//     );
// }
// // PropTypes for Label component
// Label.propTypes = {
//     children: PropTypes.node.isRequired
// };

// const LabelInput = React.forwardRef(function LabelInput({ item, handleCancelItemLabelEditing, handleSaveItemLabel, ...props }, ref) {
//     const [nameValue, setNameValue] = React.useState(item?.name || '');

//     // Log item pour voir ce qui est transmis
//     console.log('Item in LabelInput:', item);

//     // Ajout d'un useEffect pour synchroniser nameValue avec item.name à chaque changement de item
//     React.useEffect(() => {
//         console.log('item.name changed:', item.name);
//         setNameValue(item?.name || '');
//     }, [item]);

//     const handleNameChange = (event) => {
//         setNameValue(event.target.value);
//     };

//     const reset = () => {
//         setNameValue(item?.name || '');
//     };

//     const save = () => {
//         handleSaveItemLabel(null, nameValue);
//     };

//     return (
//         <React.Fragment>
//             <StyledLabelInput {...props} onChange={handleNameChange} value={nameValue} autoFocus type="text" ref={ref} />
//             <IconButton
//                 color="success"
//                 size="small"
//                 onClick={save} // On a simplifié ici
//                 // onClick={(event) => {
//                 //     save();
//                 // }}
//             >
//                 <CheckIcon fontSize="small" />
//             </IconButton>
//             <IconButton
//                 color="error"
//                 size="small"
//                 onClick={(event) => {
//                     handleCancelItemLabelEditing(event);
//                     reset(); // Réinitialise au nom d'origine
//                 }}
//             >
//                 <CloseRoundedIcon fontSize="small" />
//             </IconButton>
//         </React.Fragment>
//     );
// });
// // PropTypes for LabelInput component
// LabelInput.propTypes = {
//     item: PropTypes.shape({
//         name: PropTypes.string.isRequired
//     }).isRequired,
//     handleCancelItemLabelEditing: PropTypes.func.isRequired,
//     handleSaveItemLabel: PropTypes.func.isRequired
// };

// const CustomTreeItem2 = React.forwardRef(function CustomTreeItem2(props, ref) {
//     const { interactions } = useTreeItem2Utils({
//         itemId: props.itemId,
//         children: props.children
//     });

//     // Log pour voir les données passées à CustomTreeItem2
//     console.log('Props in CustomTreeItem2:', props);

//     return (
//         <TreeItem2
//             {...props}
//             ref={ref}
//             slots={{ label: Label, labelInput: LabelInput }}
//             slotProps={{
//                 labelInput: {
//                     item: props.item,
//                     handleCancelItemLabelEditing: interactions.handleCancelItemLabelEditing,
//                     handleSaveItemLabel: interactions.handleSaveItemLabel
//                 }
//             }}
//         />
//     );
// });
// // PropTypes for CustomTreeItem2 component
// CustomTreeItem2.propTypes = {
//     itemId: PropTypes.string.isRequired,
//     children: PropTypes.node,
//     item: PropTypes.shape({
//         name: PropTypes.string
//     })
// };

// // Default props for CustomTreeItem2
// CustomTreeItem2.defaultProps = {
//     children: null,
//     item: { name: '' }
// };

// const FileExplorer = ({ onFolderSelect }) => {
//     return (
//         <Box sx={{ height: '100%', width: '100%', overflowY: 'auto' }}>
//             <RichTreeView
//                 items={ITEMS}
//                 slots={{ item: CustomTreeItem2 }}
//                 experimentalFeatures={{ labelEditing: true }}
//                 isItemEditable
//                 defaultExpandedItems={['1', '2']}
//                 getItemLabel={(item) => item.name}
//                 // Transmettre correctement l'item complet
//                 getItemProps={(item) => ({ item })} // Transmet l'item complet
//                 onItemSelect={(event, itemId) => {
//                     const selectedItem = ITEMS.find((item) => item.id === itemId);
//                     if (selectedItem) {
//                         onFolderSelect(selectedItem.name);
//                     }
//                 }}
//             />
//         </Box>
//     );
// };

// FileExplorer.propTypes = {
//     onFolderSelect: PropTypes.func.isRequired
// };

// export default FileExplorer;

// ==================================================================================================================================

import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CheckIcon from '@mui/icons-material/Check';
import IconButton from '@mui/material/IconButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { TreeItem2, TreeItem2Label } from '@mui/x-tree-view/TreeItem2';
import { useTreeItem2 } from '@mui/x-tree-view/useTreeItem2';
import { useTreeItem2Utils } from '@mui/x-tree-view/hooks';
import { RichTreeView } from '@mui/x-tree-view';

const StyledLabelInput = styled('input')(({ theme }) => ({
    ...theme.typography.body1,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius,
    border: 'none',
    padding: '0 2px',
    boxSizing: 'border-box',
    width: 100,
    '&:focus': {
        outline: `1px solid ${theme.palette.primary.main}`
    }
}));

// Exemples d'items pour ton application
export const ITEMS = [
    {
        id: '1',
        name: 'Documents',
        editable: false,
        fileType: 'defaultFolder',
        children: [
            { id: '1.1', name: 'Cours', editable: true, fileType: 'folder' },
            { id: '1.2', name: 'Report.docx', editable: true, fileType: 'doc' },
            { id: '1.3', name: 'Invoice.pdf', editable: true, fileType: 'pdf' }
        ]
    },
    {
        id: '2',
        name: 'Images',
        editable: false,
        fileType: 'defaultFolder',
        children: [
            { id: '2.1', name: 'Photo1.png', editable: true, fileType: 'png' },
            { id: '2.2', name: 'Design.psd', editable: true, fileType: 'psd' }
        ]
    },
    {
        id: '3',
        name: 'Musiques',
        editable: false,
        fileType: 'defaultFolder',
        children: []
    },
    {
        id: '4',
        name: 'Vidéos',
        editable: false,
        fileType: 'defaultFolder',
        children: [
            { id: '4.1', name: 'Films', editable: true, fileType: 'video' },
            { id: '4.2', name: 'Séries', editable: true, fileType: 'video' }
        ]
    },
    {
        id: '5',
        name: 'Ajouts récents',
        editable: false,
        fileType: 'defaultFolder',
        children: []
    }
];

// Composant Label pour afficher le texte dans les items
function Label({ children, ...other }) {
    return (
        <TreeItem2Label
            {...other}
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                justifyContent: 'space-between',
                minHeight: 30
            }}
        >
            {children}
        </TreeItem2Label>
    );
}
// Précision des PropTypes
Label.propTypes = {
    children: PropTypes.node, // Les children peuvent être n'importe quel élément React
    other: PropTypes.object // Les autres props passées au composant
};

// // Définition de valeurs par défaut (facultatif)
// Label.defaultProps = {
//     children: null, // Par défaut, aucun enfant
//     other: {} // Par défaut, un objet vide pour d'autres props
// };

// Composant LabelInput pour gérer l'édition de l'item
const LabelInput = React.forwardRef(function LabelInput({ item, handleCancelItemLabelEditing, handleSaveItemLabel, ...props }, ref) {
    // Initialiser l'état local avec la valeur actuelle de l'item
    const [nameValue, setNameValue] = React.useState(item.name);

    const handleNameChange = (event) => {
        setNameValue(event.target.value);
    };

    const reset = () => {
        setNameValue(item.name); // Réinitialise la valeur de l'item
    };

    const save = () => {
        // Logique pour sauvegarder les modifications
    };

    return (
        <React.Fragment>
            <StyledLabelInput {...props} onChange={handleNameChange} value={nameValue} autoFocus type="text" ref={ref} />
            <IconButton
                color="success"
                size="small"
                onClick={(event) => {
                    handleSaveItemLabel(event, nameValue); // Sauvegarde de l'édition
                    save();
                }}
            >
                <CheckIcon fontSize="small" />
            </IconButton>
            <IconButton
                color="error"
                size="small"
                onClick={(event) => {
                    handleCancelItemLabelEditing(event); // Annuler l'édition
                    reset();
                }}
            >
                <CloseRoundedIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
});
// PropTypes for LabelInput component
LabelInput.propTypes = {
    item: PropTypes.shape({
        name: PropTypes.string.isRequired
    }).isRequired,
    handleCancelItemLabelEditing: PropTypes.func.isRequired,
    handleSaveItemLabel: PropTypes.func.isRequired
};

// Composant TreeItem2 personnalisé
const CustomTreeItem2 = React.forwardRef(function CustomTreeItem2(props, ref) {
    const { interactions } = useTreeItem2Utils({
        itemId: props.itemId,
        children: props.children
    });
    const { publicAPI } = useTreeItem2(props);

    const handleInputBlur = (event) => {
        event.defaultMuiPrevented = true;
    };

    const handleInputKeyDown = (event) => {
        event.defaultMuiPrevented = true;
        const target = event.target;

        if (event.key === 'Enter' && target.value) {
            if (error) {
                return;
            }
            setError(null);
            interactions.handleSaveItemLabel(event, target.value);
        } else if (event.key === 'Escape') {
            setError(null);
            interactions.handleCancelItemLabelEditing(event);
        }
    };

    return (
        <TreeItem2
            {...props}
            ref={ref}
            slots={{ label: Label, labelInput: LabelInput }}
            slotProps={{
                labelInput: {
                    item: publicAPI.getItem(props.itemId), // Passe l'item actuel pour l'édition
                    onBlur: handleInputBlur,
                    onKeyDown: handleInputKeyDown,
                    handleCancelItemLabelEditing: interactions.handleCancelItemLabelEditing,
                    handleSaveItemLabel: interactions.handleSaveItemLabel
                }
            }}
        />
    );
});
// PropTypes for CustomTreeItem2 component
CustomTreeItem2.propTypes = {
    itemId: PropTypes.string.isRequired,
    children: PropTypes.node,
    item: PropTypes.shape({
        name: PropTypes.string
    })
};

// Composant principal pour afficher la structure avec édition
export default function FileExplorer({ onFolderSelect }) {
    return (
        <Box sx={{height: '100%', width: '100%', overflowY: 'auto' }}>
            <RichTreeView
                items={ITEMS} // Liste des items pour l'arborescence
                slots={{ item: CustomTreeItem2 }}
                experimentalFeatures={{ labelEditing: true }} // Activation de l'édition
                isItemEditable
                defaultExpandedItems={['1']} // Items développés par défaut
                getItemLabel={(item) => item.name} // Récupère le nom de l'item pour affichage
                // Transmettre correctement l'item complet
                getItemProps={(item) => ({ item })} // Transmet l'item complet
                onItemSelect={(event, itemId) => {
                    const selectedItem = ITEMS.find((item) => item.id === itemId);
                    if (selectedItem) {
                        onFolderSelect(selectedItem.name);
                    }
                }}
            />
        </Box>
    );
}

FileExplorer.propTypes = {
    onFolderSelect: PropTypes.func.isRequired
};
