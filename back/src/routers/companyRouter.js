import is from "@sindresorhus/is";
import { Router } from "express";
import { login_required } from "../middlewares/login_required";
import { companyAuthService } from "../services/companyService";

const companyAuthRouter = Router();

companyAuthRouter.post("/company/register", async function (req, res, next) {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request) 에서 데이터 가져오기
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const companyName = req.body.companyName;
    const registerNumber = req.body.registerNumber;
    const ownerName = req.body.ownerName;

    // 위 데이터를 유저 db에 추가하기
    const newCompany = await companyAuthService.addCompany({
      name,
      email,
      password,
      companyName,
      registerNumber,
      ownerName,
    });

    if (newCompany.errorMessage) {
      throw new Error(newCompany.errorMessage);
    }

    res.status(201).json(newCompany);
  } catch (error) {
    next(error);
  }
});

companyAuthRouter.post("/company/login", async function (req, res, next) {
  try {
    // req (request) 에서 데이터 가져오기
    const email = req.body.email;
    const password = req.body.password;

    // 위 데이터를 이용하여 유저 db에서 유저 찾기
    const company = await companyAuthService.getCompany({ email, password });

    if (company.errorMessage) {
      throw new Error(company.errorMessage);
    }

    res.status(200).send(company);
  } catch (error) {
    next(error);
  }
});

companyAuthRouter.get(
  "/companylist",
  login_required,
  async function (req, res, next) {
    try {
      // 전체 사용자 목록을 얻음
      const companies = await companyAuthService.getCompanies();
      res.status(200).send(companies);
    } catch (error) {
      next(error);
    }
  }
);

companyAuthRouter.get(
  "/company/current",
  login_required,
  async function (req, res, next) {
    try {
      // jwt토큰에서 추출된 사용자 id를 가지고 db에서 사용자 정보를 찾음.
      const companyId = req.currentUserId;
      const currentCompanyInfo = await userAuthService.getUserInfo({
        companyId,
      });

      if (currentCompanyInfo.errorMessage) {
        throw new Error(currentCompanyInfo.errorMessage);
      }

      res.status(200).send(currentCompanyInfo);
    } catch (error) {
      next(error);
    }
  }
);

companyAuthRouter.put(
  "/companies/:id",
  login_required,
  async function (req, res, next) {
    try {
      // URI로부터 사용자 id를 추출함.
      const companyId = req.params.id;
      // body data 로부터 업데이트할 사용자 정보를 추출함.
      const companyName = req.body.companyName ?? null;
      const email = req.body.email ?? null;
      const password = req.body.password ?? null;

      const toUpdate = { companyName, email, password };

      // 해당 사용자 아이디로 사용자 정보를 db에서 찾아 업데이트함. 업데이트 요소가 없을 시 생략함
      const updatedCompany = await companyAuthService.setCompany({
        companyId,
        toUpdate,
      });

      if (updatedCompany.errorMessage) {
        throw new Error(updatedCompany.errorMessage);
      }

      res.status(200).json(updatedCompany);
    } catch (error) {
      next(error);
    }
  }
);

companyAuthRouter.get(
  "/companies/:id",
  login_required,
  async function (req, res, next) {
    try {
      const companyId = req.params.id;
      const currentCompanyInfo = await companyAuthService.getCompanyInfo({
        companyId,
      });

      if (currentCompanyInfo.errorMessage) {
        throw new Error(currentCompanyInfo.errorMessage);
      }

      res.status(200).send(currentCompanyInfo);
    } catch (error) {
      next(error);
    }
  }
);

export { companyAuthRouter };
