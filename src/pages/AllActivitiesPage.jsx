import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import classeActivities from '../styles/allActivities.module.css';
import filteredClasses from '../styles/filteredActivities.module.css'
import { AuthContext } from '../contexts/AuthContext';

const AllActivitiesPage = () => {
    const { isAuthenticated, user } = useContext(AuthContext);
    const [activities, setActivities] = useState([]);
    const [filteredActivities, setFilteredActivities] = useState([]);
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState('');

    useEffect(() => {
        const fetchActivities = async () => {
            console.log('Fetching activities...');
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/activities`);
                if (response.ok) {
                    const activitiesData = await response.json();
                    console.log(activitiesData)
                    console.log(activitiesData[0].company.city)
                    setActivities(activitiesData);
                    setFilteredActivities(activitiesData);
                    fetchFilterOptions(); 
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchActivities();
    }, []);

    useEffect(() => {
        console.log('Activities:', activities);
    }, [activities]);

    useEffect(() => {
        const fetchFilterOptions = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/activities`);
                if (response.ok) {
                    const activitiesData = await response.json();
                    const distinctTypes = [...new Set(activitiesData.map(activity => activity.type))];
                    setTypes(distinctTypes);
                }
            } catch (error) {
                console.log(error);
            }
        };
        
        fetchFilterOptions();
    }, []);

    const handleFilter = () => {
        let filtered = activities;

        if (selectedType) {
            filtered = filtered.filter(activity => activity.type === selectedType);
            
        }

        setFilteredActivities(filtered);
    };

    return (
        <div>
            <Navbar />
            
            <div className={classeActivities.outCtn}>
                <h2>See our activities</h2>
                <div className={classeActivities.filterContainer}>
                    <select className={classeActivities.filterSelect} value={selectedType} onChange={e => setSelectedType(e.target.value)}>
                        <option value="">All Types</option>
                        {types.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    <button  className={classeActivities.filterButton} onClick={handleFilter}>Apply Filter</button>
                </div>
            </div>
            <div className={`${classeActivities.mainCtn} ${filteredClasses.filteredMainCtn}`}>
                {filteredActivities.map(activity => (
                    <div className={classeActivities.activity} key={activity._id}>
                        <div className={classeActivities.item}>
                            <Link to={`/activityDetails/${activity._id}`}>
                                <p className={classeActivities.text}>{activity.type}, {!activity.company ? (<></>): (activity.company.city) } </p>
                                
                                <img src={activity.image} alt={activity.type} />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AllActivitiesPage;
