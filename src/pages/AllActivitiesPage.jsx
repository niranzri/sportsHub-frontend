import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
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

    const [isFilterApplied, setIsFilterApplied] = useState(false);

    const handleFilter = () => {
        let filtered = activities;

        if (selectedType) {
            filtered = filtered.filter(activity => activity.type === selectedType);
            setIsFilterApplied(true);
        } else {
            setIsFilterApplied(false);
        }

        setFilteredActivities(filtered);
    };

    const clearFilter = () => {
        setSelectedType('');
        setIsFilterApplied(false);
        setFilteredActivities(activities);
    };

    return (
        <div className={classeActivities.pageCtn}>       
            <div className={classeActivities.outCtn}>
                <h2>See our activities</h2>
                <div className={classeActivities.filterContainer}>
                    <select className={classeActivities.filterSelect} value={selectedType} onChange={e => setSelectedType(e.target.value)}>
                        <option value="">All Types</option>
                        {types.map(type => (
                            <option key={type} value={type}>{type}</option>
                        ))}
                    </select>
                    <button className={classeActivities.filterButton} onClick={isFilterApplied ? clearFilter : handleFilter}>
                    {isFilterApplied ? 'Clear Filter' : 'Apply Filter'}
                </button>
                </div>
            </div>
            <div className={`${classeActivities.mainCtn} ${filteredClasses.filteredMainCtn}`}>
                {filteredActivities.map(activity => (
                    <div className={classeActivities.activity} key={activity._id}>
                        <div className={classeActivities.item}>
                            <Link to={`/activityDetails/${activity._id}`}>
                                <div className={classeActivities.text}>
                                <p >{activity.type}</p>
                                <p> {!activity.company ? (<></>): (activity.company.city) }</p>
                                </div>
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
