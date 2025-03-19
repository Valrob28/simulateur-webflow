# Simulateur de Performance

Un simulateur de performance d'investissement pour Webflow qui permet de calculer les rendements théoriques basés sur les votes positifs/négatifs.

## Fonctionnalités

- Recherche d'actions par nom ou symbole
- Simulation de performance sur une période donnée
- Calcul de la valeur totale et du rendement annuel
- Interface utilisateur intuitive et responsive
- Support pour les cryptomonnaies, ETF et actions du CAC 40

## Installation

1. Créez un nouveau dépôt sur GitHub
2. Clonez ce dépôt
3. Copiez les fichiers `simulator.js` et `index.html` dans votre projet
4. Intégrez le code dans votre site Webflow

## Intégration dans Webflow

1. Allez dans "Project Settings" > "Custom Code"
2. Dans la section "Footer Code", ajoutez :

```html
<script src="https://raw.githubusercontent.com/votre-username/simulateur-webflow/main/simulator.js"></script>
<script>
  window.addEventListener('DOMContentLoaded', () => {
    const container = document.createElement('div');
    container.id = 'simulator-container';
    const targetElement = document.getElementById('simulator-target');
    if (targetElement) {
      targetElement.appendChild(container);
      initSimulator('simulator-container');
    }
  });
</script>
```

3. Ajoutez une div avec l'ID `simulator-target` dans votre page Webflow

## Personnalisation

Vous pouvez personnaliser l'apparence en modifiant les styles CSS dans la fonction `createSimulatorCSS()` du fichier `simulator.js`.

## Licence

MIT 