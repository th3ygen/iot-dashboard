import { useState, useRef, useEffect } from "react";
import { useOutletContext, useNavigate, useLocation } from "react-router-dom";
import { Parser } from "expr-eval";
import Tippy from "@tippyjs/react";
import Popup from "reactjs-popup";
import { FaPlay, FaPlus } from "react-icons/fa";

import PageHeader from "components/PageHeader.component";

import styles from "styles/user/filter/AddFilter.module.scss";
import "tippy.js/dist/tippy.css";
import "tippy.js/dist/backdrop.css";
import "tippy.js/animations/scale.css";
import "tippy.js/animations/shift-away.css";

function AddDevicePage() {
	const location = useLocation();
	const navigate = useNavigate();

	const [user, setUser] = useOutletContext();

	const filterNameRef = useRef();
	const varNameRef = useRef();
	const varValueRef = useRef();
	const varGroupRef = useRef();
	const exprRef = useRef();
	const resultRef = useRef();

	const [newVarForm, setNewVarForm] = useState(false);

	const [vars, setVars] = useState([]);

	const addVar = () => {
		if (varNameRef.current.value.length > 0) {
			const newVars = [...vars];
			newVars.push({
				name: varNameRef.current.value,
				value: varValueRef.current.value,
			});
			setVars(newVars);

			console.log(newVars);

			varNameRef.current.value = "";
			varValueRef.current.value = "";

			setNewVarForm(false);
		}
	};

	const removeVar = (field) => {
		const newVars = [...vars];
		newVars.splice(newVars.indexOf(field), 1);
		setVars(newVars);
	};

	const testRun = () => {
		try {
			const str = exprRef.current.value;

			const parser = Parser.parse(str);

			const variables = {};

			vars.forEach((varObj) => {
				variables[varObj.name] = varObj.value;
			});

			const result = parser.evaluate(variables);

			let out = `RESULT\n\nVariables:\n${parser
				.variables()
				.join(", ")}\n\n=${result}`;

			resultRef.current.value = out;
		} catch (e) {
			resultRef.current.value = `RESULT\n\n${e.message}`;
		}
	};

	const validateExpr = () => {
		if (vars.length === 0) {
			return false;
		}

		try {
			const str = exprRef.current.value;

			const parser = Parser.parse(str);

			const variables = {};

			vars.forEach((varObj) => {
				variables[varObj.name] = varObj.value;
			});

			parser.evaluate(variables);

			return true;
		} catch (e) {
			return false;
		}
	};

	const updateFilter = async () => {
		try {
			const isExpressionValid = validateExpr();

			if (!isExpressionValid) {
				throw new Error("Expression is not valid");
			}

			const fields = vars.map((v) => v.name);

			let request = await fetch(
				"http://localhost:8080/api/filter/update",
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						auth: user.token,
					},
					body: JSON.stringify({
						id: location.state.id,
						label: filterNameRef.current.value,
						expression: exprRef.current.value,
						fields,
						testValues: vars.map((v) => ({
							label: v.name,
							value: v.value,
						})),
					}),
				}
			);

			if (request.status === 200) {
				request = await fetch(
					"http://localhost:8080/api/filter/updatetest/" +
						location.state.id,
					{
						method: "PATCH",
						headers: {
							"Content-Type": "application/json",
							auth: user.token,
						},
						body: JSON.stringify({
							testValues: vars,
						}),
					}
				);

				if (request.status === 200) {
					navigate("/user/filters", { replace: true });
				}
			}
		} catch (e) {
			alert("Error creating filter: " + e);
		}
	};

	useEffect(() => {
		(async () => {
			if (location.state.id && user.token) {
				let req, res;

				req = await fetch(
					"http://localhost:8080/api/filter/id/" + location.state.id,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
							auth: user.token,
						},
					}
				);

				if (req.status === 200) {
					res = await req.json();

					const testVars = res.fields.map((f) => ({
						name: f,
						value: 0,
					}));

					if (res.testValues && res.testValues.length > 0) {
						testVars.forEach((v, i) => {
							v.value = res.testValues[i].value;
						});
					}

					setVars(testVars);

					filterNameRef.current.value = res.label;
					exprRef.current.value = res.expression;
				}
			}
		})();
	}, [location.state.id, user.token]);

	return (
		<div className="container">
			<PageHeader
				title="Edit filter"
				brief="Customize your filter"
				navs={[
					{
						name: "Filters",
						path: "/user/filters",
						icon: "FaArrowLeft",
					},
				]}
			/>
			<div className={styles.content}>
				<div className={styles.form}>
					<div className={styles.item}>
						<div className={styles.label}>Filter name</div>
						<input type="text" ref={filterNameRef} />
					</div>
					<div className={styles.item}>
						<div className={styles.label}>
							Expression, refer{" "}
							<a href="https://www.npmjs.com/package/expr-eval">
								Expression
							</a>
						</div>
						<div className={styles.editor}>
							<div className={styles.header}>
								<div className={styles.title}>
									Expression editor
								</div>
								<div className={styles.actions}>
									<Tippy
										content="Test run"
										delay={[500, 0]}
										duration={[100, 100]}
										animation="scale"
										inertia="true"
									>
										<div
											className={styles.action}
											onClick={testRun}
										>
											<FaPlay />
										</div>
									</Tippy>
								</div>
							</div>
							<div className={styles.cols}>
								<div className={styles.expr}>
									<textarea
										textarea
										placeholder="Create your arithmetic expression here"
										ref={exprRef}
									></textarea>
								</div>
								<div className={styles.result}>
									<textarea
										textarea
										placeholder="RESULT"
										ref={resultRef}
										disabled
									></textarea>
								</div>
							</div>
						</div>
					</div>
					<div className={styles.item}>
						<div className={styles.label}>Fields/Variables</div>
						<div className={styles.group} ref={varGroupRef}>
							<div className={styles.vars}>
								{vars.map((v, index) => (
									<Tippy
										key={index}
										content="Click to remove"
									>
										<div
											className={styles.var}
											onClick={() => removeVar(v)}
										>
											<div>{v.name}</div>
											<div>{v.value}</div>
										</div>
									</Tippy>
								))}
							</div>
							<div className={`${styles.item} ${styles.addBtn}`}>
								<div
									className="neon-btn"
									onClick={() => setNewVarForm(true)}
								>
									<FaPlus /> <span>Add variable</span>
								</div>
							</div>
						</div>
					</div>

					<div className={styles.item} onClick={updateFilter}>
						<div className="neon-btn">Update filter</div>
					</div>
				</div>
			</div>

			<Popup
				open={newVarForm}
				closeOnDocumentClick
				onClose={() => setNewVarForm(false)}
			>
				<div className={styles.popup}>
					<div className={styles.varform}>
						<div className={styles.item}>
							<div className={styles.label}>Name</div>
							<input type="text" ref={varNameRef} />
						</div>
						<div className={styles.item}>
							<div className={styles.label}>Value</div>
							<input type="number" ref={varValueRef} />
						</div>
					</div>
					<div className={styles.button}>
						<div className="neon-btn" onClick={addVar}>
							Add filter
						</div>
					</div>
				</div>
			</Popup>
		</div>
	);
}

export default AddDevicePage;
