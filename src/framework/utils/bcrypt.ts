import bcrypt from 'bcrypt';

const encryptData = async (data: string) => {
  const encryptedData = await bcrypt.hash(data, 10);

  return encryptedData;
};

const verifyData = async (unencryptedData: string, encryptedData: string) => {
  const isMatch = await bcrypt.compare(unencryptedData, encryptedData);

  return isMatch;
};

export { encryptData, verifyData };
