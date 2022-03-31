import { connect } from 'mongoose';

class DatabaseConnection {
  private connectionString: string;
  constructor(connectionString: string) {
    this.connectionString = connectionString;
  }
  public async connect() {
    try {
      await this.tryToConnect();
      console.log('✅ MongoDB Connected!');
    } catch (error) {
      console.error('❌ Error trying to connect to the database: ' + error);
    }
  }
  private async tryToConnect() {
    console.log('📡 Connecting to MongoDB...');
    const connection = connect(this.connectionString);
    return connection;
  }
}

export { DatabaseConnection };
