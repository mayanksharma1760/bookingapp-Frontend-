import "./header.css"
import {
    faBed,
    faCalendarDays,
    faCar,
    faPerson,
    faPlane,
    faTaxi,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DateRange } from "react-date-range";
import { useState } from "react";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file 
import { format } from "date-fns"
import { useNavigate } from "react-router-dom";


const Header = ({type}) => {
    const navigate = useNavigate();
    const [destination, setDestination] = useState("");
    const [openDate, setOpenDate] = useState(false)
    const [date, setDate] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ])

    const [options, setOptions] = useState({
        adult: 1,
        children: 0,
        room: 1,
    });
    const [openOptions, setOpenOptions] = useState(false)


    const handleOption = (name, operation) => {
        setOptions((prev) => {
            return {
                ...prev,
                [name]: operation === "i" ? options[name] + 1 : options[name] - 1
            }
        })
    }

    const handleSearch = () => {
        navigate("/hotels", { state: { destination, date, options } });
      };
    
    return (
        <div className="header">
            <div className={ type === "list" ? "headerContainer listMode" : "headerContainer"}>
                <div className="headerList">
                    <div className="headerListItem active" onClick={handleSearch}>
                        <FontAwesomeIcon icon={faBed}  />
                        <span>Stays</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faPlane} />
                        <span>Flights</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faCar} />
                        <span>Car rentals</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faBed} />
                        <span>Attractions</span>
                    </div>
                    <div className="headerListItem">
                        <FontAwesomeIcon icon={faTaxi} />
                        <span>Airport taxis</span>
                    </div>
                </div>
                {type !== "list" && (
                     <>
                <h1 className="headerTitle">
                   A Luxurious Hotel & life -100%
                </h1>
                <p className="headerDesc">
                    Start booking rooms in the Desired city YOu want -Now
                </p>
                <button className="headerBtn">Sign in / Register</button>
                <div className="headerSearch">

                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faBed} className="headerIcon"  />
                        <input type="text" 
                        placeholder="Enter Your desired place"
                         className="headerSearchInput" 
                         onChange={(e) => setDestination(e.target.value)}/>
                    </div>

                    <div className="headerSearchItem" >
                        <FontAwesomeIcon icon={faCalendarDays} onClick={() => setOpenDate(!openDate)} className="headerIcon" />
                        <span onClick={() => setOpenDate(!openDate)} className="headerSearchText">{`${format(date[0].startDate, "MM/dd/yyyy")}to${format(date[0].endDate, "MM/dd/yyyy")}`}</span>
                        {openDate && < DateRange
                            editableDateInputs={true}
                            onChange={item => setDate([item.selection])}
                            moveRangeOnFirstSelection={false}
                            ranges={date}
                            className='date'
                            minDate={new Date()}
                            style={{ backgroundColor: 'gray', Color: 'white' }}
                        />}
                    </div>

                    <div className="headerSearchItem">
                        <FontAwesomeIcon icon={faPerson} className="headerIcon" onClick={() => setOpenOptions(!openOptions)}  />
                        <span onClick={() => setOpenOptions(!openOptions)} className="headerSearchText">{`${options.adult} adult.${options.children} children .${options.room}Room`}</span>
                        {openOptions &&(<div className="options">
                            <div className="optionItem">
                                <span className="optionText">Adult</span>
                                <div className="optionCounter">
                                    <button className="optionCounterButton" onClick={() => handleOption('adult', 'd')} disabled={options.adult <= 1}>-</button>
                                    <span className="optionCounterNumber">{options.adult}</span>
                                    <button className="optionCounterButton" onClick={() => handleOption('adult', 'i')}>+</button>
                                </div>
                            </div>
                            <div className="optionItem">
                                <span className="optionText">Children</span>
                                <div className="optionCounter">
                                    <button className="optionCounterButton" onClick={() => handleOption('children', 'd')} disabled={options.children <= 0}>-</button>
                                    <span className="optionCounterNumber">{options.children}</span>
                                    <button className="optionCounterButton" onClick={() => handleOption('children', 'i')}>+</button>
                                </div>
                            </div>
                            <div className="optionItem">
                                <span className="optionText">Rooms</span>
                                <div className="optionCounter">
                                    <button className="optionCounterButton" onClick={() => handleOption('room', 'd')} disabled={options.room <= 1}>-</button>
                                    <span className="optionCounterNumber">{options.room}</span>
                                    <button className="optionCounterButton" onClick={() => handleOption('room', 'i')}>+</button>
                                </div>
                            </div>
                        </div>
                        )}
                    
                    </div>
                    <div className="headerSearchItem">
                <button className="headerBtn" onClick={handleSearch} >
                  Search
                </button>
              </div>
            </div>
          </>
        )}
                </div>
            </div>
      

    )
}

export default Header
