// Configuration du simulateur
const config = {
  actions: [
    // Cryptomonnaies
    {
      id: 'BTC',
      name: 'Bitcoin',
      positiveVotes: 150,
      negativeVotes: 50,
      description: 'Cryptomonnaie principale',
      category: 'crypto'
    },
    {
      id: 'ETH',
      name: 'Ethereum',
      positiveVotes: 120,
      negativeVotes: 30,
      description: 'Plateforme de smart contracts',
      category: 'crypto'
    },
    {
      id: 'SOL',
      name: 'Solana',
      positiveVotes: 90,
      negativeVotes: 40,
      description: 'Blockchain haute performance',
      category: 'crypto'
    },
    {
      id: 'DOGE',
      name: 'Dogecoin',
      positiveVotes: 70,
      negativeVotes: 60,
      description: 'Meme coin populaire',
      category: 'crypto'
    },
    // ETF
    {
      id: 'CAC40',
      name: 'ETF CAC 40',
      positiveVotes: 130,
      negativeVotes: 40,
      description: 'ETF répliquant le CAC 40',
      category: 'etf'
    },
    {
      id: 'S&P500',
      name: 'ETF S&P 500',
      positiveVotes: 140,
      negativeVotes: 35,
      description: 'ETF répliquant le S&P 500',
      category: 'etf'
    },
    {
      id: 'NASDAQ',
      name: 'ETF NASDAQ',
      positiveVotes: 125,
      negativeVotes: 45,
      description: 'ETF répliquant le NASDAQ',
      category: 'etf'
    },
    {
      id: 'STOXX600',
      name: 'ETF STOXX 600',
      positiveVotes: 110,
      negativeVotes: 30,
      description: 'ETF répliquant le STOXX 600',
      category: 'etf'
    },
    // Actions CAC 40
    {
      id: 'LVMH',
      name: 'LVMH',
      positiveVotes: 145,
      negativeVotes: 35,
      description: 'Luxury goods and retail',
      category: 'cac40'
    },
    {
      id: 'SANOFI',
      name: 'Sanofi',
      positiveVotes: 115,
      negativeVotes: 45,
      description: 'Pharmaceutical company',
      category: 'cac40'
    },
    {
      id: 'AIRBUS',
      name: 'Airbus',
      positiveVotes: 105,
      negativeVotes: 55,
      description: 'Aerospace and defense',
      category: 'cac40'
    },
    {
      id: 'BNP',
      name: 'BNP Paribas',
      positiveVotes: 95,
      negativeVotes: 65,
      description: 'Banking and financial services',
      category: 'cac40'
    },
    {
      id: 'TOTAL',
      name: 'TotalEnergies',
      positiveVotes: 100,
      negativeVotes: 60,
      description: 'Oil and gas company',
      category: 'cac40'
    },
    {
      id: 'ORANGE',
      name: 'Orange',
      positiveVotes: 85,
      negativeVotes: 75,
      description: 'Telecommunications',
      category: 'cac40'
    }
  ]
};

// Fonction pour créer le HTML du simulateur
function createSimulatorHTML() {
  return `
    <div class="performance-simulator">
      <h2>Simulateur de Performance</h2>
      
      <div class="search-container">
        <div class="input-group">
          <label>Rechercher une action</label>
          <div class="search-wrapper">
            <input type="text" id="searchInput" placeholder="Bitcoin, Ethereum, Solana...">
            <div class="search-results" id="searchResults"></div>
          </div>
        </div>
        <div class="selected-action" id="selectedAction">
          <div class="action-info">
            <h3>Sélectionnez une action</h3>
            <p class="action-description">Choisissez une action pour simuler sa performance</p>
          </div>
        </div>
      </div>

      <div class="simulator-inputs">
        <div class="input-group">
          <label>Montant investi</label>
          <input type="number" id="investment" value="500" min="100" step="100">
          <span>€</span>
        </div>
        <div class="input-group">
          <label>Année de début</label>
          <select id="startYear"></select>
        </div>
        <div class="input-group">
          <label>Année de fin</label>
          <select id="endYear"></select>
        </div>
      </div>

      <div class="performance-results">
        <div class="result-card">
          <h3>Valeur totale</h3>
          <p class="value" id="totalValue">0€</p>
          <p class="subtitle" id="endYearLabel">Au 2024</p>
        </div>
        <div class="result-card">
          <h3>Rendement annuel</h3>
          <p class="value" id="annualReturn">0%</p>
          <p class="subtitle">Moyenne</p>
        </div>
      </div>

      <div class="disclaimer">
        <p>* Simulation basée sur les performances passées et le ratio de votes positifs. Les performances futures ne sont pas garanties.</p>
      </div>
    </div>
  `;
}

// Fonction pour créer le CSS du simulateur
function createSimulatorCSS() {
  return `
    .performance-simulator {
      background: white;
      border-radius: 8px;
      padding: 2rem;
      margin: 2rem auto;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      max-width: 800px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    }

    .performance-simulator h2 {
      color: #333;
      margin-bottom: 2rem;
      text-align: center;
      font-size: 1.8rem;
    }

    .search-container {
      margin-bottom: 2rem;
    }

    .search-wrapper {
      position: relative;
    }

    .search-results {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-top: 4px;
      max-height: 200px;
      overflow-y: auto;
      display: none;
      z-index: 1000;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .search-results.active {
      display: block;
    }

    .search-result-item {
      padding: 0.75rem;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .search-result-item:hover {
      background-color: #f8f9fa;
    }

    .selected-action {
      margin-top: 1rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 4px;
      border: 1px solid #ddd;
    }

    .action-info h3 {
      margin: 0;
      color: #333;
      font-size: 1.1rem;
    }

    .action-description {
      margin: 0.5rem 0 0;
      color: #666;
      font-size: 0.9rem;
    }

    .simulator-inputs {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      position: relative;
    }

    .input-group label {
      font-weight: 600;
      color: #666;
      font-size: 0.9rem;
    }

    .input-group input,
    .input-group select {
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 1rem;
      width: 100%;
      transition: border-color 0.2s ease;
    }

    .input-group input:focus,
    .input-group select:focus {
      outline: none;
      border-color: #4CAF50;
    }

    .input-group input {
      padding-right: 2rem;
    }

    .input-group span {
      position: absolute;
      right: 1rem;
      top: 2.5rem;
      color: #666;
    }

    .performance-results {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin: 2rem 0;
    }

    .result-card {
      background: #f8f9fa;
      padding: 1.5rem;
      border-radius: 8px;
      text-align: center;
      transition: transform 0.2s ease;
    }

    .result-card:hover {
      transform: translateY(-2px);
    }

    .result-card h3 {
      color: #666;
      margin-bottom: 0.5rem;
      font-size: 1rem;
    }

    .result-card .value {
      font-size: 2rem;
      font-weight: 700;
      color: #333;
      margin: 0.5rem 0;
    }

    .result-card .subtitle {
      color: #666;
      font-size: 0.9rem;
      margin: 0;
    }

    .disclaimer {
      text-align: center;
      color: #666;
      font-size: 0.9rem;
      margin-top: 2rem;
      font-style: italic;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 4px;
    }

    @media (max-width: 600px) {
      .performance-simulator {
        padding: 1rem;
        margin: 1rem;
      }

      .simulator-inputs {
        grid-template-columns: 1fr;
      }

      .performance-results {
        grid-template-columns: 1fr;
      }
    }

    .search-category-header {
      padding: 0.5rem 0.75rem;
      background-color: #f0f0f0;
      font-weight: 600;
      color: #666;
      font-size: 0.9rem;
      border-bottom: 1px solid #ddd;
    }

    .search-result-item {
      padding: 0.75rem;
      cursor: pointer;
      transition: background-color 0.2s ease;
      border-bottom: 1px solid #eee;
    }

    .search-result-item:last-child {
      border-bottom: none;
    }

    .search-result-item strong {
      color: #333;
      display: block;
      margin-bottom: 0.25rem;
    }

    .search-result-item small {
      color: #666;
    }
  `;
}

// Fonction pour filtrer les actions
function filterActions(searchTerm) {
  return config.actions.filter(action => 
    action.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    action.id.toLowerCase().includes(searchTerm.toLowerCase())
  );
}

// Fonction pour afficher les résultats de recherche
function displaySearchResults(results) {
  const searchResults = document.getElementById('searchResults');
  searchResults.innerHTML = '';
  
  if (results.length === 0) {
    searchResults.innerHTML = '<div class="search-result-item">Aucun résultat trouvé</div>';
  } else {
    // Grouper les résultats par catégorie
    const groupedResults = results.reduce((acc, action) => {
      const category = action.category;
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(action);
      return acc;
    }, {});

    // Afficher les résultats groupés
    Object.entries(groupedResults).forEach(([category, actions]) => {
      const categoryHeader = document.createElement('div');
      categoryHeader.className = 'search-category-header';
      categoryHeader.textContent = category === 'crypto' ? 'Cryptomonnaies' :
                                 category === 'etf' ? 'ETF' :
                                 category === 'cac40' ? 'CAC 40' : 'Autres';
      searchResults.appendChild(categoryHeader);

      actions.forEach(action => {
        const div = document.createElement('div');
        div.className = 'search-result-item';
        div.innerHTML = `
          <strong>${action.name}</strong> (${action.id})
          <br>
          <small>${action.description}</small>
        `;
        div.addEventListener('click', () => selectAction(action));
        searchResults.appendChild(div);
      });
    });
  }
  
  searchResults.classList.add('active');
}

// Fonction pour sélectionner une action
function selectAction(action) {
  const selectedAction = document.getElementById('selectedAction');
  selectedAction.innerHTML = `
    <div class="action-info">
      <h3>${action.name} (${action.id})</h3>
      <p class="action-description">${action.description}</p>
    </div>
  `;
  
  document.getElementById('searchResults').classList.remove('active');
  document.getElementById('searchInput').value = '';
  
  // Stocker l'action sélectionnée
  selectedAction.dataset.actionId = action.id;
  
  // Mettre à jour les résultats
  updateResults();
}

// Fonction pour calculer la performance
function calculatePerformance(investment, startYear, endYear, actionId) {
  const years = endYear - startYear;
  const action = config.actions.find(a => a.id === actionId);
  
  if (!action) return { totalValue: 0, annualReturn: 0 };
  
  const positiveVoteRatio = action.positiveVotes / (action.positiveVotes + action.negativeVotes);
  const annualReturnRate = positiveVoteRatio * 0.15;
  const totalValue = investment * Math.pow(1 + annualReturnRate, years);
  
  return {
    totalValue: Math.round(totalValue),
    annualReturn: Math.round(annualReturnRate * 100)
  };
}

// Fonction pour mettre à jour les résultats
function updateResults() {
  const investment = Number(document.getElementById('investment').value);
  const startYear = Number(document.getElementById('startYear').value);
  const endYear = Number(document.getElementById('endYear').value);
  const selectedAction = document.getElementById('selectedAction');
  const actionId = selectedAction.dataset.actionId;
  
  const performance = calculatePerformance(investment, startYear, endYear, actionId);
  
  document.getElementById('totalValue').textContent = `${performance.totalValue}€`;
  document.getElementById('annualReturn').textContent = `${performance.annualReturn}%`;
  document.getElementById('endYearLabel').textContent = `Au ${endYear}`;
}

// Fonction pour initialiser le simulateur
function initSimulator(containerId) {
  // Créer et ajouter le CSS
  const style = document.createElement('style');
  style.textContent = createSimulatorCSS();
  document.head.appendChild(style);

  // Créer et ajouter le HTML
  const container = document.getElementById(containerId);
  container.innerHTML = createSimulatorHTML();

  // Remplir les sélecteurs d'années
  const currentYear = new Date().getFullYear();
  const startYearSelect = document.getElementById('startYear');
  const endYearSelect = document.getElementById('endYear');

  for (let i = 0; i < 5; i++) {
    const year = currentYear - i;
    const startOption = document.createElement('option');
    const endOption = document.createElement('option');
    
    startOption.value = year;
    startOption.textContent = year;
    endOption.value = year;
    endOption.textContent = year;
    
    startYearSelect.appendChild(startOption);
    endYearSelect.appendChild(endOption);
  }

  // Définir les valeurs par défaut
  startYearSelect.value = '2020';
  endYearSelect.value = currentYear.toString();

  // Gérer la recherche
  const searchInput = document.getElementById('searchInput');
  let searchTimeout;

  searchInput.addEventListener('input', (e) => {
    clearTimeout(searchTimeout);
    const searchTerm = e.target.value;
    
    if (searchTerm.length < 2) {
      document.getElementById('searchResults').classList.remove('active');
      return;
    }
    
    searchTimeout = setTimeout(() => {
      const results = filterActions(searchTerm);
      displaySearchResults(results);
    }, 300);
  });

  // Fermer les résultats de recherche en cliquant en dehors
  document.addEventListener('click', (e) => {
    const searchResults = document.getElementById('searchResults');
    const searchInput = document.getElementById('searchInput');
    
    if (!searchResults.contains(e.target) && e.target !== searchInput) {
      searchResults.classList.remove('active');
    }
  });

  // Ajouter les écouteurs d'événements
  document.getElementById('investment').addEventListener('input', updateResults);
  startYearSelect.addEventListener('change', updateResults);
  endYearSelect.addEventListener('change', updateResults);
}

// Code pour l'intégration dans Webflow
window.addEventListener('DOMContentLoaded', () => {
  // Créer un conteneur pour le simulateur
  const container = document.createElement('div');
  container.id = 'simulator-container';
  document.body.appendChild(container);

  // Initialiser le simulateur
  initSimulator('simulator-container');
}); 