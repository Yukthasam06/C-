package com.newproject.app.student.services;

import com.newproject.app.student.models.Signup;
import com.newproject.app.student.models.Login;

public interface User_service {
    public abstract Boolean Register(Signup data);
    public abstract String Login (Login data);
}