import React, { useState, useEffect , useRef} from "react";

import classes from './PassForm.module.css';



import {
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Button
} from "reactstrap";

import Table from "./table";


const isEmpty = value => value.trim() === '';

const isEightChars = value => value.trim().length === 8;

const checkSlot = (t1, t2) => {
	const currentDate = new Date();
	return ((t2 > t1) && (new Date(t1) >= currentDate));
};

const timeDiff = (t1, t2) => {
	const date1 = new Date(t1);
	const date2 = new Date(t2);

	const ms = date2.getTime() - date1.getTime();
	const minutes = ms / (1000 * 60);
	return (minutes / 60);
};

const ID = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", 1, 2, 3, 4, 5, 6, 7, 8, 9, "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
"U", "V", "W", "X", "Y", "Z"];

function Book()  {
  
  const [totalTables, setTotalTables] = useState([]);
  const [checkout, setCheckOut] = useState(false);
  const [formInputsValidity, setFormInputsValidity] = useState({
		name: true,
		city: true,
		phone: true,
		vehicle: true,
		license: true,
		timeSlot: true
	});

	const [isConfirmed, setIsConfirmed] = useState(false);
	const [amount, setAmount] = useState(null);
	const [ticketId, setTicketId] = useState(null);

	const nameInputRef = useRef();
	const cityInputRef = useRef();
	const phoneInputRef = useRef();
	const vehicleInputRef = useRef();
	const licenseInputRef = useRef();
	const entryInputRef = useRef();
	const exitInputRef = useRef();

	const amountHandler = () => {
		const enteredName = nameInputRef.current.value;
		const enteredCity = cityInputRef.current.value;
		const enteredPhone = phoneInputRef.current.value;
		const enteredVehicle = vehicleInputRef.current.value;
		const enteredLicense = licenseInputRef.current.value;
		const enteredEntryTime = entryInputRef.current.value;
		const enteredExitTime = exitInputRef.current.value;

		const enteredNameIsValid = !isEmpty(enteredName);
		const enteredCityIsValid = !isEmpty(enteredCity);
		const enteredPhoneIsValid = isEightChars(enteredPhone);
		const enteredVehicleIsValid = !isEmpty(enteredVehicle);
		const enteredLicenseIsValid = !isEmpty(enteredLicense);
		const enteredTimeslotIsValid = checkSlot(enteredEntryTime, enteredExitTime);

		setFormInputsValidity({
			name: enteredNameIsValid,
			city: enteredCityIsValid,
			phone: enteredPhoneIsValid,
			vehicle: enteredVehicleIsValid,
			license: enteredLicenseIsValid,
			timeSlot: enteredTimeslotIsValid
		});

		const formIsValid = (
		  enteredNameIsValid &&
		  enteredCityIsValid &&
		  enteredPhoneIsValid &&
		  enteredVehicleIsValid &&
		  enteredLicenseIsValid &&
		  enteredTimeslotIsValid
		);

		if (!formIsValid) {
		  return;
		}
		
		const hours = timeDiff(enteredEntryTime, enteredExitTime);
		//setAmount((hours * props.price).toFixed(2));

		let randomIndex;
		let x = '';
		for (let i = 0; i < 6; i++) {
			randomIndex = Math.floor(Math.random() * ID.length);
			x += ID[randomIndex];
		}

		setTicketId(x);
		setIsConfirmed(true);
	};

	const bookingHandler = (event) => {
		event.preventDefault();

		/*const enteredName = nameInputRef.current.value;
		const enteredCity = cityInputRef.current.value;
		const enteredPhone = phoneInputRef.current.value;
		const enteredVehicle = vehicleInputRef.current.value;
		const enteredLicense = licenseInputRef.current.value;
		const enteredEntryTime = entryInputRef.current.value;
		const enteredExitTime = exitInputRef.current.value;
		
		props.onBook({
			name: enteredName,
			city: enteredCity,
			phone: enteredPhone,
			vehicle: enteredVehicle,
			license: enteredLicense,
			timeSlot: [enteredEntryTime, enteredExitTime],
			id: ticketId,
			amount: amount
		});*/
	};

	const nameControlClasses = `${classes.field1} ${formInputsValidity.name ? '' : classes.invalid}`;
	const cityControlClasses = `${classes.field} ${formInputsValidity.city ? '' : classes.invalid}`;
	const phoneControlClasses = `${classes.field} ${formInputsValidity.phone ? '' : classes.invalid}`;
	const vehicleControlClasses = `${classes.field} ${formInputsValidity.vehicle ? '' : classes.invalid}`;
	const licenseControlClasses = `${classes.field} ${formInputsValidity.license ? '' : classes.invalid}`;
	const timeSlotControlClasses = `${classes.field} ${formInputsValidity.timeSlot ? '' : classes.invalid}`;
	const outputControlClasses = `${classes.output} ${isConfirmed ? classes.op : ''}`;


  // User's selections
  const [selection, setSelection] = useState({
    table: {
      name: null,
      id: null
    },
    date: new Date(),
    time: null,
    location: "Any Location",
    size: 0
  });

  // User's booking details
  const [booking, setBooking] = useState({
    name: "",
    phone: "",
    email: ""
  });


  // List of potential locations
  const [locations] = useState(["Any Location", "First", "Second", "Third"]);
  const [times] = useState([
    "8AM",
    "9AM",
    "10AM",
    "12AM",
    "1PM",
    "2PM",
    "3PM",
    "4PM",
    "5PM"
  ]);
  // Basic reservation "validation"
  const [reservationError, setReservationError] = useState(false);

  const getDate = _ => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    const date =
      months[selection.date.getMonth()] +
      " " +
      selection.date.getDate() +
      " " +
      selection.date.getFullYear();
    let time = selection.time.slice(0, -2);
    time = selection.time > 12 ? time + 12 + ":00" : time + ":00";
    console.log(time);
    const datetime = new Date(date + " " + time);
    return datetime;
  };

  const getEmptyTables = _ => {
    let tables = totalTables.filter(table => table.isAvailable);
    return tables.length;
  };

  useEffect(() => {
    // Check availability of tables from DB when a date and time is selected
    if (selection.time && selection.date) {
      (async _ => {
        let datetime = getDate();
        let res = await fetch("http://localhost:3000/availability", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            date: datetime
          })
        });
        res = await res.json();
        // Filter available tables with location and group size criteria
        let tables = res.tables.filter(
          table =>
            (selection.size > 0 ? table.capacity >= selection.size : true) &&
            (selection.location !== "Any Location"
              ? table.location === selection.location
              : true)
        );
        setTotalTables(tables);
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection.time, selection.date, selection.size, selection.location]);

  // Make the reservation if all details are filled out
  const reserve = async _ => {
    
      /*(booking.name.length === 0) |
      (booking.phone.length === 0) |
      (booking.email.length === 0)
    ) {
      console.log("Incomplete Details");
      setReservationError(true);
    } else {*/
    { 
      const datetime = getDate();
      let res = await fetch("http://localhost:3000/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...booking,
          date: datetime,
          table: selection.table.id
        })
      });
      res = await res.text();
      console.log("Reserved: " + res);
      //return Thanks;
    }
  };

  // Clicking on a table sets the selection state
  const selectTable = (table_name, table_id) => {
    setSelection({
      ...selection,
      table: {
        name: table_name,
        id: table_id
      }
    });
  };

  // Generate party size dropdown
  const getSizes = _ => {
    let newSizes = [];

    for (let i = 1; i < 8; i++) {
      newSizes.push(
        <DropdownItem
          key={i}
          className="booking-dropdown-item"
          onClick={e => {
            let newSel = {
              ...selection,
              table: {
                ...selection.table
              },
              size: i
            };
            setSelection(newSel);
          }}
        >
          {i}
        </DropdownItem>
      );
    }
    return newSizes;
  };

  // Generate locations dropdown
  const getLocations = _ => {
    let newLocations = [];
    locations.forEach(loc => {
      newLocations.push(
        <DropdownItem
          key={loc}
          className="booking-dropdown-item"
          onClick={_ => {
            let newSel = {
              ...selection,
              table: {
                ...selection.table
              },
              location: loc
            };
            setSelection(newSel);
          }}
        >
          {loc}
        </DropdownItem>
      );
    });
    return newLocations;
  };

  // Generate locations dropdown
  const getTimes = _ => {
    let newTimes = [];
    times.forEach(time => {
      newTimes.push(
        <DropdownItem
          key={time}
          className="booking-dropdown-item"
          onClick={_ => {
            let newSel = {
              ...selection,
              table: {
                ...selection.table
              },
              time: time
            };
            setSelection(newSel);
          }}
        >
          {time}
        </DropdownItem>
      );
    });
    return newTimes;
  };

  // Generating tables from available tables state
  const getTables = _ => {
    console.log("Getting tables");
    if (getEmptyTables() > 0) {
      let tables = [];
      totalTables.forEach(table => {
        if (table.isAvailable) {
          tables.push(
            <Table
              key={table._id}
              id={table._id}
              chairs={table.capacity}
              name={table.name}
              empty
              selectTable={selectTable}
            />
          );
        } else {
          tables.push(
            <Table
              key={table._id}
              id={table._id}
              chairs={table.capacity}
              name={table.name}
              selectTable={selectTable}
            />
          );
        }
      });
      return tables;
    }
  };

  return (
    <div>
      <Row noGutters className="text-center align-items-center park-cta">
        <Col>

          <p className="looking-for-park">
            {!selection.table.id ? "Search For A Spot In Terms of Time And Parking Floor" : "Confirm Reservation"}
            <i
              className={
                !selection.table.id
                  ? ""
                  : "fas fa-clipboard-check park-slice"
              }
            ></i>
          </p>
          <p className="selected-table">
            {selection.table.id
              ? "This is Your Parking ID  XJ47U  Please Save It !   " 
              : null}
          </p>
          {reservationError ? (
            <p className="reservation-error">
              * Please fill out all of the details.
      
            </p>
          ) : null}
        </Col>
      </Row>

      {!selection.table.id ? (
        <div id="reservation-stuff">
          <Row noGutters className="text-center align-items-center">
            <Col xs="12" sm="3">
              <input
                type="date"
                required="required"
                className="booking-dropdown"
                value={selection.date.toISOString().split("T")[0]}
                onChange={e => {
                  if (!isNaN(new Date(new Date(e.target.value)))) {
                    let newSel = {
                      ...selection,
                      table: {
                        ...selection.table
                      },
                      date: new Date(e.target.value)
                    };
                    setSelection(newSel);
                  } else {
                    console.log("Invalid date");
                    let newSel = {
                      ...selection,
                      table: {
                        ...selection.table
                      },
                      date: new Date()
                    };
                    setSelection(newSel);
                  }
                }}
              ></input>
            </Col>
            <Col xs="12" sm="3">
              <UncontrolledDropdown>
                <DropdownToggle color="none" caret className="booking-dropdown">
                  {selection.time === null ? "Select Time" : selection.time}
                </DropdownToggle>
                <DropdownMenu right className="booking-dropdown-menu">
                  {getTimes()}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
            <Col xs="12" sm="3">
              <UncontrolledDropdown>
                <DropdownToggle color="none" caret className="booking-dropdown">
                  {selection.location}
                </DropdownToggle>
                <DropdownMenu right className="booking-dropdown-menu">
                  {getLocations()}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
            <Col xs="12" sm="3">
              <UncontrolledDropdown>
                <DropdownToggle color="none" caret className="booking-dropdown">
                  {selection.size === 0
                    ? "Select How Many Slots"
                    : selection.size.toString()}
                </DropdownToggle>
                <DropdownMenu right className="booking-dropdown-menu">
                  {getSizes()}
                </DropdownMenu>
              </UncontrolledDropdown>
            </Col>
          </Row>
          <Row noGutters className="tables-display">
            <Col>
              {getEmptyTables() > 0 ? (
                <p className="available-tables">{getEmptyTables()} available</p>
              ) : null}

              {selection.date && selection.time ? (
                getEmptyTables() > 0 ? (
                  <div>
                    <div className="table-key">
                      <span className="empty-table"></span> &nbsp; Available
                      &nbsp;&nbsp;
                      <span className="full-table"></span> &nbsp; Unavailable
                      &nbsp;&nbsp;
                    </div>
                    <Row noGutters>{getTables()}</Row>
                  </div>
                ) : (
                  <p className="table-display-message">No Available Tables</p>
                )
              ) : (
                <p className="table-display-message">
                  Please select a date and time for your reservation.
                </p>
              )}
            </Col>
          </Row>
        </div>
      ) : (
        <div id="confirm-reservation-stuff">
          <Row
            noGutters
            className="text-center justify-content-center reservation-details-container">
              <section className = {classes.section}>
			<div className = {classes.container}>
				<div className = {classes.title}>Fill Your Form</div>
				<div className = {classes.subtitle}>Single entry and exit</div>
				<div className = {classes.space}></div>
				<form onSubmit = {bookingHandler}>
					<div className = {classes.group}>
						<div className = {nameControlClasses}>
							<input className = {classes.input} type = 'text' id = 'name' placeholder = " " ref = {nameInputRef} />
							<div className = {`${classes.cut} ${classes.cuttop}`}></div>
							<label htmlFor = "name" className = {classes.placeholder}>Full name</label>
							{!formInputsValidity.name && <p>Please enter a valid name!</p>}
						</div>        

						<div className = {cityControlClasses}>
							<input className = {classes.input} type = 'text' id = 'rescity' placeholder = " " ref = {cityInputRef} />
							<div className = {`${classes.cut} ${classes.cutbig3}`}></div>
							<label htmlFor = "rescity" className = {classes.placeholder}>
								<div className = {classes.city1}>City of residence</div>
								<div className = {classes.city2}>City</div>
							</label>
							{!formInputsValidity.city && <p>Please enter a valid city!</p>}
						</div>

						<div className = {phoneControlClasses}>
							<input className = {classes.input} type = 'text' id = 'phone' placeholder = " " ref = {phoneInputRef} />
							<div className = {classes.cut}></div>
							<label htmlFor = "phone" className = {classes.placeholder}>Phone</label>
							{!formInputsValidity.phone && <p>Please enter a valid contact!</p>}
						</div>

						<div className = {vehicleControlClasses}>
							<input className = {classes.input} type = 'text' id = 'vehicle' placeholder = " " ref = {vehicleInputRef} />
							<div className = {`${classes.cut} ${classes.cutbig2}`}></div>
							<label htmlFor = "vehicle" className = {classes.placeholder}>Vehicle model</label>
							{!formInputsValidity.vehicle && <p>Please enter a valid vehicle!</p>}
						</div>

						<div className = {licenseControlClasses}>
							<input className = {classes.input} type = 'text' id = 'license' placeholder = " " ref = {licenseInputRef} />
							<div className = {`${classes.cut} ${classes.cutbig1}`}></div>
							<label htmlFor = "license" className = {classes.placeholder}>License plate</label>
							{!formInputsValidity.license && <p>Please enter a valid license!</p>}
						</div>

						<div className = {timeSlotControlClasses}>
							<input className = {classes.input2} type = 'datetime-local' id = 'entrytime' placeholder = " " ref = {entryInputRef} />
							<div className = {`${classes.cut} ${classes.cutdate1}`}></div>
							<label htmlFor = "entrytime" className = {classes.placeholder}>Entry time</label>
						</div>
						<div className = {timeSlotControlClasses}>
							<input className = {classes.input2} type = 'datetime-local' id = 'exittime' placeholder = " " ref = {exitInputRef} />
							<div className = {`${classes.cut} ${classes.cutdate2}`}></div>
							<label htmlFor = "exittime" className = {classes.placeholder}>Exit time</label>
						</div>
						{!formInputsValidity.timeSlot && <p className={classes.center}>Please select a valid Time slot!</p>}

						<div className = {classes.field2}>
							<div className = {outputControlClasses}>
								
							</div>
						</div>  
					</div>
          {isConfirmed && <button type="text" className={classes.submit2}>BOOKED</button>}
				</form>
				{!isConfirmed && <button type="text" className={classes.submit} onClick = {reserve}>CONFIRM</button>}
			</div>
			
		</section>
         </Row>
          <Row noGutters className="text-center">
          <Col>
              </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default Book;
