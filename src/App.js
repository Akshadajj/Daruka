// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polygon, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const sidebarItems = [
  "Dashboard overview",
  "Projects management",
  "Sites management",
  "Analytics",
  "Settings",
  "Help & Documentation"
];

function TopNav() {
  return (
    <nav className="top-nav" style={{display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#004d40', color: 'white'}}>
      <div className="flex items-center hover-scale">
      <img src="image1.jpg" alt="Darukaa.Earth company logo depicting a vibrant green Earth with  clean and modern typography for 'Darukaa.Earth' in eco-friendly green colors on a subtle blue background representing global harmony" style={{height: '40px' ,width: '40px'}}/>
      <span className="ml-3 text-2xl font-extrabold tracking-wide">Darukaa.Earth</span>
      </div>
      <input type="search" placeholder="Search..." style={{width: '40%'}} />
      <div className="user-menu">
        <img src="images3.jpg" alt="User  Avatar" style={{height:'40px',width:'40px'}} />
        <select>
          <option>Account Settings</option>
          <option>Logout</option>
        </select>
      </div>
    </nav>
  );
}

function Sidebar() {
  console.log("///////");
  return (
    <aside style={{width: 200, background: '#263238', color: 'white', height: '100vh', padding: 20}}>
      <ul style={{listStyle: 'none', padding: 0}}>
        {sidebarItems.map(item => (
          <li key={item} style={{marginBottom: 15, cursor: 'pointer'}}>{item}</li>
        ))}
      </ul>
    </aside>
    
  );
}

function ProjectOverview({ projects }) {
  const totalProjects = projects.length;
  const activeSites = projects.reduce((acc, p) => acc + (p.sites ? p.sites.length : 0), 0);

  return (
    <div style={{padding: 20, background: '#eceff1', height: '100%'}}>
      <h2>Project Overview</h2>
      <p><strong>Total Projects:</strong> {totalProjects}</p>
      <p><strong>Active Sites:</strong> {activeSites}</p>
      {/* Placeholder for performance metrics and recent activity */}
      <div>
        <h3>Performance Metrics</h3>
        <p>Coming soon...</p>
      </div>
      <div>
        <h3>Recent Activity</h3>
        <p>Coming soon...</p>
      </div>
    </div>
  );
}

function MapView({ projects }) {
  console.log(".......");
  
  // Default center
  const center = [37.7749, -122.4194];

  return (
    <MapContainer center={center} zoom={10} style={{height: '500px', width: '500px'}}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {projects.map(project => (
        <React.Fragment key={project.id}>
          <Marker position={[project.location.lat, project.location.lng]}>
            <Popup>{project.name}</Popup>
          </Marker>
          {project.sites && project.sites.map(site => (
            <Polygon
              key={site.id}
              positions={site.polygon.map(coord => [coord[0], coord[1]])}
              pathOptions={{color: site.status === 'operational' ? 'green' : 'red'}}
            >
              <Popup>{site.name}</Popup>
            </Polygon>
          ))}
        </React.Fragment>
      ))}
    </MapContainer>
  );
}

function MainContent() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/projects')
      .then(response => setProjects(response.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <main style={{display: 'flex', height: 'calc(100vh - 50px)'}}>
      <div style={{flex: 6}}>
        <MapView projects={projects} />
      </div>
      <div style={{flex: 4, overflowY: 'auto'}}>
        <ProjectOverview projects={projects} />
      </div>
    </main>
  );
}

export default function App() {
  console.log("nnnnnn");
  
  return (
    <div>
      <TopNav />
      <div style={{display: 'flex'}}>
        <Sidebar />
        <MainContent />
      </div>
    </div>
  );
}

document.querySelectorAll('.sidebar li').forEach(item => {
    item.addEventListener('click', () => {
        // Remove highlight from all sidebar items
        document.querySelectorAll('.sidebar li').forEach(li => li.style.backgroundColor = '');

        // Highlight clicked item
        item.style.backgroundColor = '#10b981';

        // Hide all content sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.add('hidden');
        });

        // Show the targeted section
        const targetId = item.getAttribute('data-target');
        if (targetId) {
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.remove('hidden');
            }
        }
    });
});
