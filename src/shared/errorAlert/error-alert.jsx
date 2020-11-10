import React from 'react';
import { Alert } from 'antd';
import './error-alert.scss';

export default function ErrorAlert() {
  return (
    <div className="error-alert">
      <Alert showIcon message="Ошибка" description="Устаняем проблему" type="error" />
    </div>
  );
}
