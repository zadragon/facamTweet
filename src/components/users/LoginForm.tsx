import { signInWithEmailAndPassword, getAuth, signInWithPopup, GithubAuthProvider, GoogleAuthProvider } from "firebase/auth";
import { app } from "firebaseApp";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginForm = () => {
	const [error, setError] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [password__confirmation, setPassword__confirmation] = useState<string>("");
	const navigate = useNavigate();

	const onSubmit = async (e: any) => {
		e.preventDefault();
		try {
			const auth = getAuth(app);
			await signInWithEmailAndPassword(auth, email, password);
			navigate("/");
			toast.success("로그인 완료");
		} catch (e: any) {
			toast.error("로그인 실패");
		}
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const {
			target: { name, value },
		} = e;

		if (name === "email") {
			setEmail(value);
			const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

			if (!value?.match(validRegex)) {
				setError("유효한 이메일을 넣어주세요");
			} else {
				setError("");
			}
		}
		if (name === "password") {
			setPassword(value);

			if (value?.length < 8) {
				setError("비밀번호는 8자 이상 써주세요");
			} else {
				setError("");
			}
		}
	};

	const onClickSocialLogin = async (e: any) => {
		const {
			target: { name },
		} = e;

		let provider;
		const auth = getAuth(app);

		if (name === "google") {
			provider = new GoogleAuthProvider();
		}

		if (name === "github") {
			provider = new GithubAuthProvider();
		}

		await signInWithPopup(auth, provider as GithubAuthProvider | GoogleAuthProvider)
			.then((result) => {
				console.log(result);
				toast.success("로그인 되었습니다.");
			})
			.catch((error: any) => {
				console.log(error);
				const errorMessage = error?.message;
				toast.error(errorMessage);
			});
		console.log(name);
	};

	return (
		<form className="form form--lg" onSubmit={onSubmit}>
			<div className="form__title">로그인</div>
			<div className="form__block">
				<label htmlFor="email">이메일</label>
				<input type="text" name="email" id="email" value={email} onChange={onChange} required />
			</div>
			<div className="form__block">
				<label htmlFor="password">비밀번호</label>
				<input type="password" name="password" value={password} onChange={onChange} id="password" required />
			</div>
			{error && error?.length > 0 && (
				<div className="form__block">
					<div className="form__error">{error}</div>
				</div>
			)}

			<div className="form__block--lg">
				계정이 없으신가요?
				<Link to="/users/signup" className="form__link">
					회원가입
				</Link>
			</div>
			<div className="form__block">
				<button type="submit" className="form__btn--submit" disabled={error.length > 0}>
					로그인
				</button>
			</div>
			<div className="form__block">
				<button type="button" name="google" className="form__btn--google" onClick={onClickSocialLogin}>
					구글로 로그인
				</button>
			</div>
			<div className="form__block">
				<button type="button" name="github" className="form__btn--github" onClick={onClickSocialLogin}>
					깃헙으로 로그인
				</button>
			</div>
		</form>
	);
};

export default LoginForm;
