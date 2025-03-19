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

// Variable globale pour éviter les doublons
let simulatorInitialized = false;

// Fonction pour rechercher sur Yahoo Finance
async function searchYahooFinance(query) {
  try {
    const response = await fetch(`https://query1.finance.yahoo.com/v1/finance/search?q=${encodeURIComponent(query)}&lang=fr-FR&region=FR&quotesCount=6&newsCount=0&enableFuzzyQuery=false&quotesQueryId=tss_match_phrase_query`);
    const data = await response.json();
    return data.quotes || [];
  } catch (error) {
    console.error('Erreur lors de la recherche Yahoo Finance:', error);
    return [];
  }
}

// Fonction pour obtenir les données historiques
async function getHistoricalData(symbol, startDate, endDate) {
  try {
    const response = await fetch(`https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?period1=${startDate}&period2=${endDate}&interval=1d`);
    const data = await response.json();
    return data.chart.result[0];
  } catch (error) {
    console.error('Erreur lors de la récupération des données historiques:', error);
    return null;
  }
}

// Fonction pour calculer la performance avec les données historiques
async function calculatePerformanceWithHistory(investment, startYear, endYear, symbol) {
  const startDate = new Date(startYear, 0, 1).getTime() / 1000;
  const endDate = new Date(endYear, 11, 31).getTime() / 1000;
  
  const historicalData = await getHistoricalData(symbol, startDate, endDate);
  
  if (!historicalData) {
    return { totalValue: investment, annualReturn: 0 };
  }
  
  const timestamps = historicalData.timestamp;
  const prices = historicalData.indicators.quote[0].close;
  
  // Trouver le premier prix valide
  let firstValidIndex = 0;
  while (firstValidIndex < prices.length && prices[firstValidIndex] === null) {
    firstValidIndex++;
  }
  
  // Trouver le dernier prix valide
  let lastValidIndex = prices.length - 1;
  while (lastValidIndex > firstValidIndex && prices[lastValidIndex] === null) {
    lastValidIndex--;
  }
  
  if (firstValidIndex >= lastValidIndex) {
    return { totalValue: investment, annualReturn: 0 };
  }
  
  const firstPrice = prices[firstValidIndex];
  const lastPrice = prices[lastValidIndex];
  
  // Calculer le nombre d'années exact
  const firstDate = new Date(timestamps[firstValidIndex] * 1000);
  const lastDate = new Date(timestamps[lastValidIndex] * 1000);
  const years = (lastDate - firstDate) / (1000 * 60 * 60 * 24 * 365.25);
  
  // Calculer la valeur totale
  const totalValue = investment * (lastPrice / firstPrice);
  
  // Calculer le rendement annuel
  const annualReturn = ((Math.pow(totalValue / investment, 1 / years) - 1) * 100);
  
  return {
    totalValue: Math.round(totalValue),
    annualReturn: Math.round(annualReturn * 100) / 100
  };
}

// Fonction pour créer le HTML du simulateur
function createSimulatorHTML() {
  return `
    <div class="performance-simulator">
      <h2>Simulateur de Performance</h2>
      
      <div class="search-container">
        <div class="input-group">
          <label>Rechercher une action</label>
          <div class="search-wrapper">
            <div class="search-input-container">
              <input type="text" id="searchInput" placeholder="Bitcoin, Ethereum, Solana...">
              <div class="search-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </div>
            </div>
            <div class="search-results" id="searchResults">
              <div class="search-loading" style="display: none;">
                <div class="spinner"></div>
                <span>Recherche en cours...</span>
              </div>
              <div class="search-error" style="display: none;">
                <span>Une erreur est survenue. Veuillez réessayer.</span>
              </div>
            </div>
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

    .search-input-container {
      position: relative;
      display: flex;
      align-items: center;
    }

    .search-icon {
      position: absolute;
      right: 12px;
      color: #666;
      pointer-events: none;
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
      max-height: 300px;
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
      border-bottom: 1px solid #eee;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .search-result-item:hover {
      background-color: #f8f9fa;
    }

    .search-result-item .symbol {
      font-weight: 600;
      color: #333;
      min-width: 60px;
    }

    .search-result-item .name {
      color: #666;
      flex-grow: 1;
    }

    .search-result-item .exchange {
      font-size: 0.8rem;
      color: #999;
      text-transform: uppercase;
    }

    .search-loading {
      padding: 1rem;
      text-align: center;
      color: #666;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    .spinner {
      width: 20px;
      height: 20px;
      border: 2px solid #f3f3f3;
      border-top: 2px solid #4CAF50;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .search-error {
      padding: 1rem;
      text-align: center;
      color: #dc3545;
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
  `;
}

// Fonction pour afficher les résultats de recherche
function displaySearchResults(results) {
  const searchResults = document.getElementById('searchResults');
  const loadingElement = searchResults.querySelector('.search-loading');
  const errorElement = searchResults.querySelector('.search-error');
  
  searchResults.innerHTML = '';
  
  if (results.length === 0) {
    searchResults.innerHTML = '<div class="search-result-item">Aucun résultat trouvé</div>';
  } else {
    results.forEach(result => {
      const div = document.createElement('div');
      div.className = 'search-result-item';
      div.innerHTML = `
        <span class="symbol">${result.symbol}</span>
        <span class="name">${result.longname || result.shortname}</span>
        <span class="exchange">${result.exchange}</span>
      `;
      div.addEventListener('click', () => selectAction(result));
      searchResults.appendChild(div);
    });
  }
  
  searchResults.classList.add('active');
  loadingElement.style.display = 'none';
  errorElement.style.display = 'none';
}

// Fonction pour sélectionner une action
async function selectAction(action) {
  const selectedAction = document.getElementById('selectedAction');
  selectedAction.innerHTML = `
    <div class="action-info">
      <h3>${action.longname || action.shortname} (${action.symbol})</h3>
      <p class="action-description">${action.exchange}</p>
    </div>
  `;
  
  document.getElementById('searchResults').classList.remove('active');
  document.getElementById('searchInput').value = '';
  
  // Stocker l'action sélectionnée
  selectedAction.dataset.actionId = action.symbol;
  
  // Mettre à jour les résultats avec les données historiques
  await updateResultsWithHistory();
}

// Fonction pour mettre à jour les résultats avec les données historiques
async function updateResultsWithHistory() {
  const investment = Number(document.getElementById('investment').value);
  const startYear = Number(document.getElementById('startYear').value);
  const endYear = Number(document.getElementById('endYear').value);
  const selectedAction = document.getElementById('selectedAction');
  const actionId = selectedAction.dataset.actionId;
  
  if (!actionId) return;
  
  // Afficher un indicateur de chargement
  document.getElementById('totalValue').textContent = 'Calcul...';
  document.getElementById('annualReturn').textContent = 'Calcul...';
  
  try {
    const performance = await calculatePerformanceWithHistory(investment, startYear, endYear, actionId);
    
    // Formater les nombres avec des séparateurs de milliers
    const formattedTotalValue = performance.totalValue.toLocaleString('fr-FR');
    const formattedAnnualReturn = performance.annualReturn.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    
    document.getElementById('totalValue').textContent = `${formattedTotalValue}€`;
    document.getElementById('annualReturn').textContent = `${formattedAnnualReturn}%`;
    document.getElementById('endYearLabel').textContent = `Au ${endYear}`;
  } catch (error) {
    console.error('Erreur lors du calcul des performances:', error);
    document.getElementById('totalValue').textContent = 'Erreur';
    document.getElementById('annualReturn').textContent = 'Erreur';
  }
}

// Fonction pour initialiser le simulateur
function initSimulator(containerId) {
  // Vérifier si le simulateur est déjà initialisé
  if (simulatorInitialized) {
    console.log('Le simulateur est déjà initialisé');
    return;
  }
  
  // Marquer le simulateur comme initialisé
  simulatorInitialized = true;

  // Créer et ajouter le CSS
  const style = document.createElement('style');
  style.textContent = createSimulatorCSS();
  document.head.appendChild(style);

  // Créer et ajouter le HTML
  const container = document.getElementById(containerId);
  if (!container) {
    console.error('Container not found:', containerId);
    return;
  }
  
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
  const searchResults = document.getElementById('searchResults');
  const loadingElement = searchResults.querySelector('.search-loading');
  const errorElement = searchResults.querySelector('.search-error');
  let searchTimeout;

  searchInput.addEventListener('input', async (e) => {
    clearTimeout(searchTimeout);
    const searchTerm = e.target.value;
    
    if (searchTerm.length < 2) {
      searchResults.classList.remove('active');
      return;
    }
    
    loadingElement.style.display = 'flex';
    errorElement.style.display = 'none';
    searchResults.classList.add('active');
    
    try {
      searchTimeout = setTimeout(async () => {
        const results = await searchYahooFinance(searchTerm);
        displaySearchResults(results);
      }, 300);
    } catch (error) {
      loadingElement.style.display = 'none';
      errorElement.style.display = 'block';
      console.error('Erreur lors de la recherche:', error);
    }
  });

  // Fermer les résultats de recherche en cliquant en dehors
  document.addEventListener('click', (e) => {
    if (!searchResults.contains(e.target) && e.target !== searchInput) {
      searchResults.classList.remove('active');
    }
  });

  // Ajouter les écouteurs d'événements
  document.getElementById('investment').addEventListener('input', updateResultsWithHistory);
  startYearSelect.addEventListener('change', updateResultsWithHistory);
  endYearSelect.addEventListener('change', updateResultsWithHistory);
}

// Code pour l'intégration dans Webflow
(function() {
  // Vérifier si le simulateur est déjà initialisé
  if (window.simulatorInitialized) {
    console.log('Le simulateur est déjà initialisé');
    return;
  }

  // Marquer le simulateur comme initialisé globalement
  window.simulatorInitialized = true;

  // Fonction pour nettoyer les conteneurs existants
  function cleanupExistingContainers() {
    const existingContainers = document.querySelectorAll('#simulator-container');
    existingContainers.forEach(container => {
      container.remove();
    });
  }

  // Fonction pour initialiser le simulateur une seule fois
  function initializeSimulator() {
    // Nettoyer les conteneurs existants
    cleanupExistingContainers();

    // Vérifier si le conteneur cible existe
    const targetContainer = document.getElementById('simulator-target');
    if (!targetContainer) {
      console.log('Le conteneur cible (simulator-target) n\'existe pas');
      return;
    }

    // Vider le conteneur cible
    targetContainer.innerHTML = '';

    // Créer le conteneur du simulateur
    const container = document.createElement('div');
    container.id = 'simulator-container';
    targetContainer.appendChild(container);

    // Initialiser le simulateur
    initSimulator('simulator-container');
  }

  // Attendre que le DOM soit complètement chargé
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSimulator);
  } else {
    initializeSimulator();
  }

  // Nettoyer les conteneurs lors du déchargement de la page
  window.addEventListener('unload', cleanupExistingContainers);
})(); 