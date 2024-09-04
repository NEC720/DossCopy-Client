import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

function ImpressionPage() {
  const [étapeActuelle, setÉtapeActuelle] = useState(1);
  const [typeImpression, setTypeImpression] = useState('');
  const [caractéristiques, setCaractéristiques] = useState({});
  const [nombreExemplaires, setNombreExemplaires] = useState(1);
  const [cyberSelectionné, setCyberSelectionné] = useState(null);
  const [cybers, setCybers] = useState([
    // Liste de vos cybers avec leurs informations (latitude, longitude, etc.)
  ]);

  const handleÉtapeSuivante = () => {
    // Validation des données avant de passer à l'étape suivante
    if (/* toutes les données sont valides */) {
      setÉtapeActuelle(étapeActuelle + 1);
    } else {
      // Afficher un message d'erreur
    }
  };

  const handleÉtapePrécédente = () => {
    setÉtapeActuelle(étapeActuelle - 1);
  };

  const Étape1 = () => {
    // Formulaire pour choisir le type d'impression et les caractéristiques
    return (
      <div>
        {/* ... votre formulaire */}
      </div>
    );
  };

  const Étape2 = () => {
    return (
      <div>
        <MapContainer center={[51.505, -0.09]} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {cybers.map((cyber) => (
            <Marker key={cyber.id} position={[cyber.latitude, cyber.longitude]}>
              <Popup>
                {cyber.nom}<br />
                {cyber.adresse}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
        {/* Panneau avec les détails du cyber sélectionné */}
      </div>
    );
  };

  const Étape3 = () => {
    return (
      <div>
        {/* Affichage du récapitulatif */}
        <button onClick={() => {
          // Envoyer la demande d'impression au cyber
        }}>Terminer & Imprimer</button>
      </div>
    );
  };

  return (
    <div>
      {étapeActuelle === 1 && <Étape1 />}
      {étapeActuelle === 2 && <Étape2 />}
      {étapeActuelle === 3 && <Étape3 />}
      {/* Boutons Précédent et Suivant */}
    </div>
  );
}

export default ImpressionPage;