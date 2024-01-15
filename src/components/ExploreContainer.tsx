import './ExploreContainer.css';

interface ContainerProps {
  name: string;
}

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {
  return (
    <div id="container">
      <strong><h1>Projet Vente Voiture</h1></strong>
      <h2>Bienvenue</h2>
    </div>
  );
};

export default ExploreContainer;
